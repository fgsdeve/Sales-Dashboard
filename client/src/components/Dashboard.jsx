import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("/api/leads", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLeads(res.data);
        processChartData(res.data, "Leads");
      } catch (err) {
        console.error(err);
      }
    };

    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/contacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDeals = async () => {
      try {
        const res = await axios.get("/api/deals", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDeals(res.data);
        processChartData(res.data, "Deals");
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/api/companies", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeads();
    fetchContacts();
    fetchDeals();
    fetchCompanies();
  }, []);

  const processChartData = (data, type) => {
    const labels = data.map(
      (item) => item.firstName || item.dealName || item.name
    );
    const values = data.map((item) => item.leadScore || item.amount);

    setChartData({
      labels,
      datasets: [
        {
          label: type,
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Sales Dashboard</h2>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <div className="leads-list">
        <h3>Leads</h3>
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              {lead.firstName} {lead.lastName} - {lead.leadScore}
            </li>
          ))}
        </ul>
      </div>
      <div className="contacts-list">
        <h3>Contacts</h3>
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.firstName} {contact.lastName} - {contact.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="deals-list">
        <h3>Deals</h3>
        <ul>
          {deals.map((deal) => (
            <li key={deal.id}>
              {deal.dealName} - {deal.amount}
            </li>
          ))}
        </ul>
      </div>
      <div className="companies-list">
        <h3>Companies</h3>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              {company.name} - {company.industry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
