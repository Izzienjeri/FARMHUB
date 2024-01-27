import React, { useEffect, useState } from "react";

const FarmList = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/farm_management/farms", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch farms");
        }

        const data = await response.json();
        setFarms(data.farms);
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Farm List</h2>
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

export default FarmList;
