import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/banners").then((res) => {
      setBanners(res.data);
    });
  }, []);

  return (
    <div className="home">
      {banners.map((banner) => (
        <div className="banner" key={banner.id}>
          <img src={banner.image} alt={banner.title} />
          <h2>{banner.title}</h2>
          <p>{banner.subtitle}</p>
        </div>
      ))}
    </div>
  );
} 