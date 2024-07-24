import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, ListGroup, ListGroupItem, Image, CloseButton } from 'react-bootstrap';
import './AddListing.css'
import { addListingAPI } from '../../api/listingAPI';
import { useSelector, useDispatch} from 'react-redux';
import { selectOperationError, selectOperationLoading, getMyListings, selectOperationSuccess, addListing} from '../../slices/listingSlice';
import { Oval } from 'react-loader-spinner';

const AddListing = ({onSubmit, initialData}) => {
  const dispatch=useDispatch();
    const error=useSelector(selectOperationError);
    const loading=useSelector(selectOperationLoading);
    const success=useSelector(selectOperationSuccess);
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        description: '',
        price: '',
        area: '',
        maxPeople: '',
        bedrooms: '',
        rooms: '',
        garden: false,
        kitchen: false,
        hall: false,
        bed: false,
        parking: false
      });
      const [files, setFiles] = useState([]);
    
      useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        }
      }, [initialData]);
      useEffect(() => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(setFetchError(null));
            }
            else{
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
          [name]: type === 'checkbox' ? checked : value
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
      if(files.length>0){  
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i]);
     }}
  dispatch(addListing(data));
  dispatch(getMyListings());
      };
    
      return (
        <Container>
        <Form className="add-listing-form" onSubmit={handleSubmit} encType="multipart/form-data">
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
            {(formData.type === 'Flat' || formData.type === 'Room') && (
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
            {formData.type === 'Flat' && (<Col md={6} lg={4}>
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
            </Col>)}
            
            {formData.type === 'House' && (
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
          <Row className="add-listing-row" >
            {formData.type === 'House' && (
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
            {formData.type === 'Flat' && (
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
            {formData.type === 'Room' && (
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
            <Form.Group >
              <Form.Control
                type="file"
                 id="fileInput"
                name="pictures"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button className="add-listing-field" variant="transparent" style={{border:"1px solid"}}
                onClick={() => document.getElementById('fileInput').click()}>
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
          <Oval visible={true} height="20" color="#f0f0f0" ariaLabel="oval-loading" />
        </div>
      ) : (
        <div>
          {initialData ? 'Update Listing' : 'Create Listing'}
        </div>
      )}
            
          </Button>
        </Form>
      </Container>
    );
  };
  

export default AddListing