import React from 'react';
import { Route, Routes,Link  } from "react-router-dom";
import Profile from './presional/Profile';



function CustomerProfile() {
  return <div>
   <Routes >
     <Route index path="/profile" element={<Profile /> }></Route>
   </Routes>
  </div>;
}

export default CustomerProfile;
