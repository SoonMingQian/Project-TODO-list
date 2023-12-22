import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import DateTimePicker from "react-datetime-picker"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

export default function Update() {
    //Extracting id from URL parameters
    let { id } = useParams();

    //State variables for title, description, datetime, and navigation
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datetime, setDateTime] = useState(new Date());
    const navigate = useNavigate();

    //Fetching the TO-DO list data with the specified id 
    useEffect(() => {
        console.log("Fetching list with id:", id);
        axios.get('http://localhost:4000/addlist/' + id)
            .then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDateTime(response.data.datetime);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    //Function to handle form submission for updating TO-DO list
    const handleSubmit = (event) => {
        event.preventDefault();
        const newList = {
            id: id,
            title: title,
            description: description,
            datetime: datetime
        };

        //Sending a PUT request to update the TO-DO list
        axios.put('http://localhost:4000/addlist/' + id, newList)
            .then((res) => {
                console.log(res.data);
                //Navigating back to the TO-DO list page after successful update
                navigate('/list');
            });
    };

    return (
        <div>
            <div>
                {/* Navigation bar */}
                <Navbar className="bg-body-tertiary justify-content-between" bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/list">TaskHub</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/list">My TO-DO List</Nav.Link>
                            <Nav.Link href="/addList">Add TO-DO List</Nav.Link>
                        </Nav>
                        <Link to='/'><FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} color='white' /></Link>
                    </Container>
                </Navbar>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <h1>Update Book Details</h1>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Form inputs for updating TO-DO list */}
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Update TO-DO List Title</span>
                    <input type="text"
                        class="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Update TO-DO List Description</span>
                    <textarea type="text"
                        class="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{height:"100px"}}
                    ></textarea>
                </div>
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Add DateTime</span>
                    <DateTimePicker 
                    class="form-control"
                    value={datetime}
                        onChange={(newDateTime) => setDateTime(new Date(newDateTime))} />
                </div>
                 {/* Submit button */}
                <div className="form-group" style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <input type="submit" value="Edit Book" className="btn btn-dark" />
                </div>
            </form>
        </div>
    );
}
