import gptImg from '@/assets/gptImage.jpeg';
import { useState } from "react";

const Login = ({ setUser, setPasscode }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("🔹 Login Response:", data);

      if (response.ok) {
        setUser(username);
        setPasscode(password);
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:9000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("🔹 Signup Response:", data);

      if (response.ok) {
        setUser(username);
        setPasscode(password);
      } else {
        setError(data.error || "Signup failed.");
      }
    } catch (err) {
      console.error("❌ Signup Error:", err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={gptImg} alt="ChatGPT" />
        <h2 className="title">Web ChatGPT (OpenAI 4.29)</h2>
        <p className="register-change" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>
        {error && <p className="error-message">{error}</p>}
        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleSignup} disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          ) : (
            <button type="button" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
