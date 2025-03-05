import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// Debugging: Log Environment Variables
console.log("🔑 PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "MISSING");
console.log("📌 PROJECT_ID:", process.env.PROJECT_ID ? "Loaded" : "MISSING");
console.log("🔑 OpenAI API Key:", process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.slice(0, 10) + "..." : "MISSING");


// Middleware to ensure request body is parsed
router.use(express.json());

/**
 * 🚀 Signup Route
 * Syncs user with ChatEngine
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    console.log(`🔍 Signing up user: ${username}`);

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      { username, passcode: password },
      { headers: { "Private-Key": process.env.PRIVATE_KEY } }
    );

    console.log("✅ Signup Successful:", chatEngineResponse.data);
    res.status(200).json({ response: chatEngineResponse.data });

  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
});

/**
 * 🚀 Login Route
 * Authenticates user via ChatEngine
 */
router.post("/login", async (req, res) => {
  try {

    await delay(1000);
    console.log("🔍 Login request received:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const chatEngineResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        prompt: `Authenticate user: ${username}`,
        max_tokens: 10,
        stream: true
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    

    console.log("✅ Login Successful:", chatEngineResponse.data);
    res.status(200).json({ response: chatEngineResponse.data });

  } catch (error) {
    console.error("❌ Login Error:", error);

    let statusCode = error.response?.status || 500;
    let errorMessage = error.response?.data?.message || "Internal Server Error";

    res.status(statusCode).json({ error: errorMessage });
  }
});

export default router;
