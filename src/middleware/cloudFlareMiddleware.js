const cloudflare = require("cloudflare");
const { CLOUDFLARE_EMAIL, CLOUDFLARE_API_KEY } = process.env;

const authenticateCloudflare = (req, res, next) => {
  try {
    cloudflare({
      email: CLOUDFLARE_EMAIL,
      key: CLOUDFLARE_API_KEY,
    });
    next();
  } catch (error) {
    console.error("Cloudflare authentication failed:", error);
    res.status(500).json({ error: "Cloudflare Authentication Failed" });
  }
};

module.exports = { authenticateCloudflare };
