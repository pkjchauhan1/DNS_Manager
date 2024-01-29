const express = require("express");
const router = express.Router();
const cloudflare = require("cloudflare");
const axios = require("axios");
const {
  authenticateCloudflare,
} = require("../middleware/cloudFlareMiddleware");
router.use(authenticateCloudflare);

var cloudflareApiKey = "af5b53b27b5cf40ad37e1e09e794b6b354dba";
var cloudflareEmail = "pkjchauhan1@gmail.com";

const headers = {
  "X-Auth-Email": cloudflareEmail,
  "X-Auth-Key": cloudflareApiKey,
  "Content-Type": "application/json",
};

const zoneId = "6391394cc6999bb20a4976f57cdf2fe7";

router.get("/records/test", async (req, res) => {
  try {
    const cloudflareApiKey = process.env.CLOUDFLARE_API_KEY;
    const cloudflareEmail = process.env.CLOUDFLARE_EMAIL;

    const headers = {
      "X-Auth-Email": cloudflareEmail,
      "X-Auth-Key": cloudflareApiKey,
      "Content-Type": "application/json",
    };
    const zoneId = "6391394cc6999bb20a4976f57cdf2fe7";

    const data = await axios.get(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      { headers }
    );
    console.log(data.errors);
    return res.status(200).json({ status: 200, data: data.data });
  } catch (error) {
    console.log(error.response.data);
    return res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/records/add", async (req, res) => {
  try {
    let payload = req.body;

    const data = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      payload,
      { headers }
    );
    return res.status(200).json({ status: 200, data: data.data });
  } catch (error) {
    console.log(error.response.data);
    return res.status(500).json({ status: 500, message: error.message });
  }
});

module.exports = router;
