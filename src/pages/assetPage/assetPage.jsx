import React, { useState, useEffect } from "react";
import "./assetPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AssetPage = () => {
  const navigate = useNavigate();
  const [assetName, setAssetName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user_auth_token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("user_auth_token");
      const config = {
        headers: { "x-access-token": token },
      };
      axios
        .post("http://localhost:8000/asset/assetDetails", { assetName, quantity, cost }, config)
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
          }
          console.log(response);
        })
        .catch((error) => {
          if (!error.response.data.success) {
            toast.error(error.response.data.message);
          }
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Enter Asset Details</h1>
      <form className="asset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="assetName">Asset Name</label>
          <input type="text" id="assetName" name="assetName" value={assetName} onChange={(e) => setAssetName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Cost</label>
          <input type="number" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} step="0.01" min="0.01" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssetPage;
