const axios = require("axios");

const getCompanies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/companies",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    const companies = response.data.results;

    const processedCompanies = companies.map((company) => ({
      id: company.id,
      name: company.properties.name,
      industry: company.properties.industry,
      domain: company.properties.domain,
    }));

    res.json(processedCompanies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCompanies };
