import React, { useState, useEffect } from "react";

const FarmManagement = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    fetch("/farm_management/farms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFarms(data.farms);
      })
      .catch((error) => {
        console.error("Error fetching farms:", error);
      });
  }, []);

  return (
    <div>
      <h2>Farm Management</h2>
      <ul>
        {farms.map((farm) => (
          <li key={farm.farm_id}>
            <strong>{farm.name}</strong> - Location: {farm.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmManagement;
