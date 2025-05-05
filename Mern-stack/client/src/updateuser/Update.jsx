import React, { useState, useEffect } from 'react';
import "./Update.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Assumes you're passing user ID via route

  // Fetch user data to update
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to load user data", { position: "top-right" });
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/user/${id}`, user);
      toast.success(response.data.message || "User updated successfully", { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/" className="btn btn-success">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            value={user.name}
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            value={user.address}
            autoComplete="off"
            placeholder="Enter your address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
