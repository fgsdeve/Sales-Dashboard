import React from "react";

function LeadList({ leads }) {
  return (
    <div className="lead-list">
      <h3>Leads</h3>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            {lead.firstName}
            {lead.lastName} -{lead.leadScore}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadList;
