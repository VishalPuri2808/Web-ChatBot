import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

async function testOpenAI() {
  try {
    console.log("🔍 Testing Mock API...");
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    console.log("✅ Mock API Response:", response.data);
  } catch (error) {
    console.error("❌ Mock API Error:", error.response?.data || error.message);
  }
}

testOpenAI();
