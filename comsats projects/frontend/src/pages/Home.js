import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import { API_BASE_URL } from "../config/api";
import "./Home.css";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/banners`)
      .then((res) => {
        setBanners(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load banners");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="home">Loading...</div>;
  if (error) return <div className="home error">{error}</div>;

  return (
    <div className="home">
      {banners.map((banner) => (
        <Banner key={banner.id} {...banner} />
      ))}
    </div>
  );
} 