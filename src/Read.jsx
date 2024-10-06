import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Read = () => {
    const [data, setData] = useState({});
    //It gives the id from Url
    const { id } = useParams();
    useEffect(() => {
        //Based on id it will give us record
        axios.get("http://localhost:3000/users/" + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id]);

    return (
        <>
            <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
                <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                    <h3>Details of User</h3>
                    <div className="mb-2">
                        <strong>Name:</strong> {data.name}
                    </div>
                    <div className="mb-2">
                        <strong>Email:</strong> {data.email}
                    </div>
                    <div className="mb-2">
                        <strong> Phone: </strong>{data.phone}
                    </div>

                    <div className="mb-2">
                        <strong>Username:</strong> {data.username}
                    </div>

                    <div className="mb-2">
                        <strong>Street:</strong> {data.address?.street}
                    </div>
                    <div className="mb-2">
                        <strong>City:</strong> {data.address?.city}
                    </div>
                    <div className="mb-3">
                        <strong>Company:</strong> {data.company?.name}
                    </div>
                    <Link to={`/update/${id}`} className="btn btn-success">Edit</Link>
                    <Link to='/' className="btn btn-primary ms-3">Back</Link>
                </div>
            </div>
        </>
    )

};
export default Read;
