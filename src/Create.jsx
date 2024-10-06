import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

const Create = () => {
    const [inputdata, setInputdata] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        username: 'USER-name', // Pre-fill with format
        street: '',
        city: '',
        company: ''
    });
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (event) => {
        setInputdata({ ...inputdata, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' }); // Clear error on change
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!inputdata.name || inputdata.name.length < 3) {
            newErrors.name = "Name is required and must be at least 3 characters.";
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputdata.email || !emailPattern.test(inputdata.email)) {
            newErrors.email = "Email is required and must be a valid format.";
        }

        // Phone validation
        const phonePattern = /^\d{10}$/; // Adjust for your phone format
        if (!inputdata.phone || !phonePattern.test(inputdata.phone)) {
            newErrors.phone = "Phone is required and must be a valid 10-digit number.";
        }

        // Username validation
        if (!inputdata.username || inputdata.username.length < 3) {
            newErrors.username = "Username is required and must be at least 3 characters.";
        }

        // Street validation
        if (!inputdata.street) {
            newErrors.street = "Street is required.";
        }

        // City validation
        if (!inputdata.city) {
            newErrors.city = "City is required.";
        }

        // Company validation (optional but must be at least 3 characters if provided)
        if (inputdata.company && inputdata.company.length < 3) {
            newErrors.company = "Company name must be at least 3 characters if provided.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleForm = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const newId = users.length > 0 ? Math.max(...users.map(user => parseInt(user.id, 10))) + 1 : 1;
            const newUser = { ...inputdata, id: newId };

            axios.post("http://localhost:3000/users", newUser)
                .then(res => {
                    console.log(res);
                    setShowModal(false);
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    const handleShow = () => {
        setInputdata({
            id: '',
            name: '',
            email: '',
            phone: '',
            username: 'USER-name', // Pre-fill username format
            street: '',
            city: '',
            company: ''
        });
        setErrors({});
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
                <Button variant="primary" onClick={handleShow}>Add User</Button>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleForm}>
                            <div className="mb-2">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={inputdata.name}
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && <small className="text-danger">{errors.name}</small>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inputdata.email}
                                    className="form-control"
                                    placeholder="Enter Email"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={inputdata.phone}
                                    className="form-control"
                                    placeholder="Enter Phone"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={inputdata.username}
                                    className="form-control"
                                    placeholder="Enter Username"
                                    onChange={handleChange}
                                    required
                                    readOnly // Non-editable field
                                />
                                {errors.username && <small className="text-danger">{errors.username}</small>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="street">Street:</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={inputdata.street}
                                    className="form-control"
                                    placeholder="Enter Street"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.street && <small className="text-danger">{errors.street}</small>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={inputdata.city}
                                    className="form-control"
                                    placeholder="Enter City"
                                    onChange={handleChange}
                                    required
                                />
                                {errors.city && <small className="text-danger">{errors.city}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="company">Company Name:</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={inputdata.company}
                                    className="form-control"
                                    placeholder="Enter Company Name (optional)"
                                    onChange={handleChange}
                                />
                                {errors.company && <small className="text-danger">{errors.company}</small>}
                            </div>
                            <Button variant="success" type="submit">Submit</Button>
                            <Button variant="secondary" className="ms-3" onClick={handleClose}>Close</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default Create;
