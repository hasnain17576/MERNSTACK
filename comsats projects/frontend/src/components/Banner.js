import React from "react";
import PropTypes from "prop-types";
import "./Banner.css";

export default function Banner({ image, title, subtitle }) {
  return (
    <div className="banner">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

Banner.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}; 