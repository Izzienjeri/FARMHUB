import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <ul>
          <li>Username: {userData.username}</li>
          <li>First Name: {userData.firstname}</li>
          <li>Last Name: {userData.lastname}</li>
          <li>Email: {userData.email}</li>
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
