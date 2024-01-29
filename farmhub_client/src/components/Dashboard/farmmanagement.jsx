import React, { useState, useEffect } from "react";
import AddFarmForm from "../FarmManagement/addfarmform";
import FarmList from "../FarmManagement/farmlist";

const FarmManagement = () => {
  return (
    <div>
      <h2>Farm Management</h2>
      <AddFarmForm />
      <FarmList />
    </div>
  );
};

export default FarmManagement;
