import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-200 flex justify-between">
      <Link to="/">Meme Shop</Link>
      <div>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-2">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/cart" className="ml-2">Cart</Link>
      </div>
    </nav>
  );
}
