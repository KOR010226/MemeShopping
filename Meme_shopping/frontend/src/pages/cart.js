import { useState, useEffect } from "react";
import API from "../utils/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const checkout = async () => {
    const token = localStorage.getItem("token");
    if(!token) return alert("Please login first");
    const items = cart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }));
    const res = await API.post("/orders", { items });
    alert("Order created! Total: $" + res.data.total);
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="border p-2 mb-2">
              <p>{item.name} x {item.quantity} - ${item.price}</p>
            </div>
          ))}
          <button onClick={checkout} className="p-2 bg-green-500 text-white">Checkout</button>
        </>
      )}
    </div>
  );
}
