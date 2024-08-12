import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  CloseButton,
} from "react-bootstrap";
import "./AddListing.css";
import { addListingAPI } from "../../api/listingAPI";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOperationError,
  selectOperationLoading,
  getMyListings,
  selectOperationSuccess,
  addListing,
} from "../../slices/listingSlice";
import { Oval } from "react-loader-spinner";

import {
  StandaloneSearchBox,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useGoogleMaps } from "../../context/GoogleMapContext";
import Swal from "sweetalert2";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 27.6730537,
  lng: 85.34189479999999,
};

const AddListing = ({ onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectOperationError);
  const loading = useSelector(selectOperationLoading);
  const success = useSelector(selectOperationSuccess);

  const [searchBox, setSearchBox] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    price: "",
    area: "",
    location: "",
    latitude: "",
    longitude: "",
    maxPeople: "",
    bedrooms: "",
    rooms: "",
    garden: false,
    kitchen: false,
    hall: false,
    bed: false,
    parking: false,
  });
  const [files, setFiles] = useState([]);
  const {isLoaded}=useGoogleMaps();

  const handlePlaceChanged = () => {
    const place = searchBox.getPlaces()[0];
    if (place) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lng,
        location: place.formatted_address,
      }));
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setFormData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
    setMarkerPosition({ lat, lng });
    // You can use reverse geocoding to get the address from lat/lng
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_GOOGLE_MAP_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results[0]) {
          setFormData((prevData) => ({
            ...prevData,
            location: data.results[0].formatted_address,
          }));
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  useEffect(() => {
    if (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setFetchError(null));
        } else {
          dispatch(setFetchError(null));
        }
      });
    }
    // if (success) {
    //   Swal.fire({
    //     title: "Congratulations!",
    //     text: success,
    //     icon: "success"
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       resetForm();
    //       dispatch(setSuccess(null));
    //       setIsSignUp(false);
    //     }
    //     else{
    //       resetForm();
    //       dispatch(setSuccess(null));
    //       setIsSignUp(false);
    //     }

    //   });
    // }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
    }
    console.log(formData);
    dispatch(addListing(data));
    dispatch(getMyListings());
  };

  return (
    <>
    {isLoaded ? (
          <div className="add-listing">
          
          <div className="add-listing-form">
            <Container>
              <Form
                className="add-listing-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Row className="add-listing-row">
                  <Col md={6} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select type</option>
                        <option value="Flat">Flat</option>
                        <option value="Room">Room</option>
                        <option value="House">House</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
      
                  <Col md={12} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="add-listing-field">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
      
                <Row className="add-listing-row">
                  <Col md={6} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Location</Form.Label>
                      <StandaloneSearchBox
                        onLoad={(ref) => setSearchBox(ref)}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <Form.Control
                          type="string"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </StandaloneSearchBox>
                    </Form.Group>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control
                        type="string"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control
                        type="string"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Label>Area (sq ft)</Form.Label>
                      <Form.Control
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  {(formData.type === "Flat" || formData.type === "Room") && (
                    <Col md={6} lg={4}>
                      <Form.Group className="add-listing-field">
                        <Form.Label>Max People</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxPeople"
                          value={formData.maxPeople}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {formData.type === "Flat" && (
                    <Col md={6} lg={4}>
                      <Form.Group className="add-listing-field">
                        <Form.Label>Bedrooms</Form.Label>
                        <Form.Control
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  )}
      
                  {formData.type === "House" && (
                    <Col md={6} lg={4}>
                      <Form.Group className="add-listing-field">
                        <Form.Label>Rooms</Form.Label>
                        <Form.Control
                          type="number"
                          name="rooms"
                          value={formData.rooms}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row className="add-listing-row">
                  {formData.type === "House" && (
                    <Col md={6} lg={4}>
                      <Form.Group className="add-listing-field">
                        <Form.Check
                          type="checkbox"
                          label="Garden"
                          name="garden"
                          checked={formData.garden}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {formData.type === "Flat" && (
                    <>
                      <Col md={6} lg={4}>
                        <Form.Group className="add-listing-field">
                          <Form.Check
                            type="checkbox"
                            label="Kitchen"
                            name="kitchen"
                            checked={formData.kitchen}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} lg={4}>
                        <Form.Group className="add-listing-field">
                          <Form.Check
                            type="checkbox"
                            label="Hall"
                            name="hall"
                            checked={formData.hall}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}
                  {formData.type === "Room" && (
                    <Col md={6} lg={4}>
                      <Form.Group className="add-listing-field">
                        <Form.Check
                          type="checkbox"
                          label="Bed"
                          name="bed"
                          checked={formData.bed}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  <Col md={6} lg={4}>
                    <Form.Group className="add-listing-field">
                      <Form.Check
                        type="checkbox"
                        label="Parking"
                        name="parking"
                        checked={formData.parking}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Control
                        type="file"
                        id="fileInput"
                        name="pictures"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <Button
                        className="add-listing-field"
                        variant="transparent"
                        style={{ border: "1px solid" }}
                        onClick={() => document.getElementById("fileInput").click()}
                      >
                        Attach Pictures
                      </Button>
                    </Form.Group>
                    {files.length > 0 && (
                      <ListGroup>
                        {files.map((file, index) => (
                          <ListGroupItem key={index}>
                            <Row className="align-items-center">
                              <Col xs={8}>{file.name}</Col>
                              <Col xs={4} className="text-right">
                                <CloseButton onClick={() => removeFile(index)} />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                </Row>
                <Button disabled={loading} variant="primary" type="submit">
                  {loading ? (
                    <div>
                      <Oval
                        visible={true}
                        height="20"
                        color="#f0f0f0"
                        ariaLabel="oval-loading"
                      />
                    </div>
                  ) : (
                    <div>{initialData ? "Update Listing" : "Create Listing"}</div>
                  )}
                </Button>
              </Form>
            </Container>
          </div>
          <div className="add-listing-map">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </div>
        </div>
    ) : (<></>)}    

    </>





  );
};

export default AddListing;
