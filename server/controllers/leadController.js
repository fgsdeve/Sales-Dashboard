const axios = require("axios");

const getLeads = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/leads",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    const leads = response.data.results;

    const processedLeads = leads.map((lead) => ({
      id: lead.id,
      firstName: lead.properties.firstname,
      lastName: lead.properties.lastname,
      email: lead.properties.email,
      phone: lead.properties.phone,
      leadScore: lead.properties.hs_lead_score,
    }));

    res.json(processedLeads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLeads };
