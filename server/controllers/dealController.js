const axios = require("axios");

const getDeals = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/deals",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    const deals = response.data.results;

    const processedDeals = deals.map((deal) => ({
      id: deal.id,
      dealName: deal.properties.dealname,
      dealStage: deal.properties.dealstage,
      amount: deal.properties.amount,
    }));

    res.json(processedDeals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDeals };
