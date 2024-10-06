import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
    // State hooks for input fields
    const [inputdata, setInputdata] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        username: '',
        street: '',
        city: '',
        company: ''
    });

    //Handle input changes
    const handleChange = (event) => {
        setInputdata({ ...inputdata, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();
    //It gives the id from Url
    const { id } = useParams();
    useEffect(() => {
        //Based on id it will give us record
        axios.get("http://localhost:3000/users/" + id)
            .then(res => {
                setInputdata(res.data);
            })
            .catch(err => console.log(err))
    }, [id]);

    //Handle update
    const handleUpdate = (event) => {
        //preventing default behavior
        event.preventDefault();
        //Updating an existing resource
        axios.put("http://localhost:3000/users/" + id, inputdata)
            .then(res => {
                console.log(res);
                //After successful update, redirect to homepage
                navigate('/');
            })
            .catch(err => console.log(err));
    };


    return (
        <>
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
                <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                    <h1>Update User</h1>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-2">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={inputdata.name}
                                className="form-control"
                                placeholder="Enter Name"
                                onChange={handleChange}

                            />
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

                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={inputdata.phone}
                                className="form-control"
                                placeholder="Enter Phone"
                                onChange={handleChange}

                            />
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
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="street">Street:</label>
                            <input
                                type="text"
                                name="street"
                                value={inputdata.address?.street}
                                className="form-control"
                                placeholder="Enter Street"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                name="city"
                                value={inputdata.address?.city}
                                className="form-control"
                                placeholder="Enter City"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company">Company Name:</label>
                            <input
                                type="text"
                                name="company"
                                value={inputdata.company?.name}
                                className="form-control"
                                placeholder="Enter Company Name"
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn btn-success" type="submit">Update</button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default Update;