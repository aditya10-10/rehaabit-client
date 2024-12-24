require("dotenv").config(); // Load environment variables

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron"); // Import node-cron for scheduling tasks

const BASE_URL = process.env.REACT_SITEMAP_BASE_URL;

// Check if the environment variable is set
if (!BASE_URL) {
  console.error("Error: REACT_SITEMAP_BASE_URL is not defined in .env");
  process.exit(1);
}

const sitemapUrl = `${BASE_URL}/sitemap.xml`;
// console.log("Fetching sitemap from:", sitemapUrl);

// Define path for saving the sitemap
const sitemapFilePath = path.resolve(__dirname, "public", "sitemap.xml");

// Function to fetch and save sitemap
const fetchAndSaveSitemap = async () => {
  try {
    const response = await axios.get(sitemapUrl);
    fs.writeFileSync(sitemapFilePath, response.data);
    // console.log("Sitemap fetched and saved to the public directory!");
  } catch (error) {
    console.error("Error fetching the sitemap:", error.message);
  }
};

// Initial fetch and save in background
fetchAndSaveSitemap()
  .then(() => {
    // Continue without waiting for the task to finish
    // console.log("Sitemap fetch complete, continuing...");
  })
  .catch((error) => {
    console.error("Error with the sitemap fetch:", error.message);
  });

// Schedule to fetch and save the sitemap every hour
// cron.schedule("0 * * * *", () => {
//   console.log("Fetching and updating the sitemap...");
//   fetchAndSaveSitemap();
// });
