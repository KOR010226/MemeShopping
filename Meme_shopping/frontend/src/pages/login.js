import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="p-4">
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="border p-1 mb-2 w-full"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-1 mb-2 w-full"/>
      <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
    </form>
  );
}
