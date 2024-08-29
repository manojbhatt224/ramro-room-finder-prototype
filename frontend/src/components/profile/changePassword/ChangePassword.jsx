import React from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <div className="card">
      <h3 className="title">Change Password</h3>
      <div className="form-group">
        <label className="label">Current password</label>
        <input type="password" className="input-field" />
      </div>
      <div className="form-group">
        <label className="label">New password</label>
        <input type="password" className="input-field" />
      </div>
      <div className="form-group">
        <label className="label">Repeat new password</label>
        <input type="password" className="input-field" />
      </div>
    </div>
  );
};

export default ChangePassword;
