import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/authSlice';
import "./General.css";

const General = () => {
  const [update, setUpdate] = useState(false);
  const myself = useSelector(selectUser);
  const [userDetail, setUserDetail] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    if (myself) {
      setUserDetail({
        firstName: myself.firstName || '',
        lastName: myself.lastName || '',
        username: myself.username || '',
        email: myself.email || ''  
      });
    }
  }, [myself]);

  const [imgSrc, setImgSrc] = useState("https://bootdey.com/img/Content/avatar/avatar1.png");

  const submitUpdate = () => {
    if (update) {
      console.log('Saving changes:', userDetail);
      // Add logic to save changes, e.g., dispatching an action to update user details
    }
    setUpdate(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImgSrc(fileUrl);
    }
  };

  const onReset = (e) => {
    e.preventDefault();
    setImgSrc("https://bootdey.com/img/Content/avatar/avatar1.png");
  };

  return (
    <div className="card general-wrapper">
      <div className="general-form">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input
            name="firstName"
            onChange={handleInputChange}
            readOnly={!update}
            type="text"
            className={`input-field ${update ? '' : 'non-edit'}`}
            value={userDetail.firstName}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input
            name="lastName"
            onChange={handleInputChange}
            readOnly={!update}
            type="text"
            className={`input-field ${update ? '' : 'non-edit'}`}
            value={userDetail.lastName}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            name="username"
            onChange={handleInputChange}
            readOnly={!update}
            type="text"
            className={`input-field ${update ? '' : 'non-edit'}`}
            value={userDetail.username}
          />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            name="email"
            onChange={handleInputChange}
            readOnly={!update}
            type="text"
            className={`input-field ${update ? '' : 'non-edit'}`}
            value={userDetail.email}
          />
        </div>
        <button onClick={submitUpdate} className="btn-update">
          {update ? 'Save' : 'Update'}
        </button>
      </div>
      <div className="general-image">
        <img
          src={imgSrc}
          loading="lazy"
          alt="User Avatar"
          className="avatar"
        />
        <div className="general-image-options">
          <div className="btn-upload" onClick={() => document.getElementById('profile-file-input').click()}>
            Upload
            <input
              type="file"
              onChange={handleFileChange}
              id="profile-file-input"
              className="input-field"
              style={{ display: "none" }}
            />
          </div>
          <div className="btn-upload-reset" onClick={onReset}>
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
