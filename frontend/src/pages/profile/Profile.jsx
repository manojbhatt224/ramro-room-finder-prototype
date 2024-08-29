import React, {useState} from "react";

import "./Profile.css"
import General from "../../components/profile/general/General";
import ChangePassword from "../../components/profile/changePassword/ChangePassword";


const Profile = () => {
  const [option,setOption] = useState("General");
  

  return (
    <div className="my-profile-wrapper">
      <div className="my-profile-options">
        <div className="profile-options">
          <div className="option" style={{borderBottom: option==="General" ? "5px solid lightblue":""}} onClick={()=>setOption("General")}>General</div>
          <div className="option" style={{borderBottom: option==="Security" ? "5px solid lightblue":""}} onClick={()=>setOption("Security")}>Security</div>
           </div>

      </div>
      <div className="my-profile-content">
        {option==="General" && <General/>}
        {option==="Security" && <ChangePassword/>}        
      </div>
      
    </div>
  );
};

export default Profile;
