import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("accessToken");

    history.push("/login");
  }, [history]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
