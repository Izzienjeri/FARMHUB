import React, { useState } from "react";

const AddFarmForm = ({ onAddFarm }) => {
  const [farmData, setFarmData] = useState({
    name: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5555/farm_management/add_farm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(farmData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          onAddFarm();
        } else {
          console.error("Error adding farm:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding farm:", error);
      });

    setFarmData({
      name: "",
      location: "",
    });
  };

  return (
    <div>
      <h2>Add Farm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Farm Name:
          <input
            type="text"
            name="name"
            value={farmData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={farmData.location}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Farm</button>
      </form>
    </div>
  );
};

export default AddFarmForm;
