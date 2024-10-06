import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'; // Import Bootstrap Modal

const Home = () => {
    // State hooks
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal visibility
    const [isEditMode, setIsEditMode] = useState(false); // Track if it's edit mode
    const [selectedUserId, setSelectedUserId] = useState(null); // Track user for deletion

    // State for form inputs
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

    useEffect(() => {
        // Fetching user data
        axios.get("http://localhost:3000/users")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    // Handle modal visibility
    const handleShow = () => {
        setIsEditMode(false); // Reset to add mode
        setInputdata({ id: '', name: '', email: '', phone: '', username: '', street: '', city: '', company: '' });
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setIsEditMode(true); // Set edit mode
        setInputdata({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
            street: user.address?.street,
            city: user.address?.city,
            company: user.company?.name
        });
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    // Handle form input changes
    const handleChange = (event) => {
        setInputdata({ ...inputdata, [event.target.name]: event.target.value });
    };

    // Handle form submission
    const handleForm = (event) => {
        event.preventDefault();

        if (isEditMode) {
            // Update user
            axios.put(`http://localhost:3000/users/${inputdata.id}`, inputdata)
                .then(res => {
                    const updatedData = data.map(user => user.id === inputdata.id
                        ? { ...inputdata, address: { street: inputdata.street, city: inputdata.city }, company: { name: inputdata.company } }
                        : user
                    );
                    setData(updatedData);
                    setShowModal(false);
                })
                .catch(err => console.log(err));
        } else {
            // Add new user
            const newId = data.length > 0 ? Math.max(...data.map(user => parseInt(user.id, 10))) + 1 : 1;
            const newUser = { ...inputdata, id: newId, address: { street: inputdata.street, city: inputdata.city }, company: { name: inputdata.company } };

            axios.post("http://localhost:3000/users", newUser)
                .then(res => {
                    setData([...data, newUser]); // Update table data
                    setShowModal(false); // Close modal
                })
                .catch(err => console.log(err));
        }
    };

    // Handle delete confirmation modal
    const handleDelete = (id) => {
        setSelectedUserId(id);
        setShowDeleteModal(true); // Show delete confirmation modal
    };

    // Confirm delete action
    const confirmDelete = () => {
        axios.delete(`http://localhost:3000/users/${selectedUserId}`)
            .then(res => {
                const updatedData = data.filter(user => user.id !== selectedUserId);
                setData(updatedData); // Update state to reflect deletion
                setShowDeleteModal(false); // Close confirmation modal
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center bg-light w-100 ">
                <h1 className="text-center">List of Users</h1>
                <div className="container w-100">
                    <div className="rounded bg-white border shadow p-4">
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="success" onClick={handleShow}>Create</Button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Username</th>
                                        <th>Street</th>
                                        <th>City</th>
                                        <th>Company</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((val, idx) => (
                                        <tr key={idx}>
                                            <td>{val.id}</td>
                                            <td>{val.name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.phone}</td>
                                            <td>{val.username}</td>
                                            <td>{val.address?.street}</td>
                                            <td>{val.address?.city}</td>
                                            <td>{val.company?.name}</td>
                                            <td>
                                                <button onClick={() => handleEdit(val)} className="btn btn-sm btn-primary me-2">Edit</button>
                                                <button onClick={() => handleDelete(val.id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for adding or editing user */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Edit User' : 'Add a User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleForm}>
                        {/* Form inputs */}
                        {Object.entries(inputdata).map(([key, value]) => (
                            key !== 'id' && (
                                <div className="mb-2" key={key}>
                                    <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        name={key}
                                        value={value}
                                        className="form-control"
                                        placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                        onChange={handleChange}
                                    />
                                </div>
                            )
                        ))}
                        <Button variant="success" type="submit">{isEditMode ? 'Update' : 'Submit'}</Button>
                        <Button variant="secondary" className="ms-3" onClick={handleClose}>Close</Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Delete confirmation modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Home;
