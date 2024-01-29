import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5555/profile/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <ul>
        <li>
          <strong>Username:</strong> {profileData.username}
        </li>
        <li>
          <strong>User ID:</strong> {profileData.user_id}
        </li>
        <li>
          <strong>First Name:</strong> {profileData.firstname}
        </li>
        <li>
          <strong>Last Name:</strong> {profileData.lastname}
        </li>
        <li>
          <strong>Email:</strong> {profileData.email}
        </li>
        {/* Add more profile information as needed */}
      </ul>
    </div>
  );
};

export default UserProfile;
