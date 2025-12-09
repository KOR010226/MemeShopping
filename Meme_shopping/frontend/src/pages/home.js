import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {products.map(p => (
        <Link key={p.id} to={`/product/${p.id}`} className="border p-2">
          <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover"/>
          <h2 className="font-bold">{p.name}</h2>
          <p>${p.price}</p>
        </Link>
      ))}
    </div>
  );
}
