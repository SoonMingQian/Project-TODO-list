import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { format } from 'date-fns';

function AddList() {

    //State vairables
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [datetime, setDateTime] = useState(new Date())
    const navigate = useNavigate()

    //Handle Form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        //Logging form input values
        console.log("Title: " + title + " Description: " + description + " DateTime: " + datetime);
        //Formatting date-time
        const formattedDateTime = format(datetime, 'yyyy-MM-dd HH:mm:ss')
        //Creating list object
        const list = ({
            title: title,
            description: description,
            datetime: formattedDateTime,
        })

        //Sending POST request to add TO-DO list
        axios.post("http://localhost:4000/addlist", list, {
        })
            .then(result => {
                console.log("TO-DO list is added");
                //Navigating to the list page after successful addition
                navigate('/list');
            })
            .catch(err => {
                console.error("Error adding TO-DO list:", err);
            });
    }
    return (
        <div>
            <div>
                {/* Navbar for navigation */}
                <Navbar className="bg-body-tertiary justify-content-between" bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="/list">TaskHub</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/list">My TO-DO List</Nav.Link>
                            <Nav.Link href="/addlist">Add TO-DO List</Nav.Link>
                        </Nav>
                        {/* Logout button */}
                        <Link to='/'><FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} color='white' /></Link>
                    </Container>
                </Navbar>
            </div>
            {/* Form for adding a new TO-DO list */}
            <h2 style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>Create A New TO-DO List</h2>
            <form onSubmit={handleSubmit}>
                {/* Input for Title */}
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Add Title</span>
                    <input type="text"
                        class="form-control"
                        value={title}
                        required
                        onChange={(e) => { setTitle(e.target.value) }}
                    ></input>
                </div>
                {/* Input for Description */}
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Add Notes</span>
                    <textarea type="text"
                        class="form-control"
                        value={description}
                        required
                        onChange={(e) => { setDescription(e.target.value) }}
                    ></textarea>
                </div>
                {/* Input for DateTime */}
                <div class="input-group mb-3" style={{ margin: "auto", marginTop: "50px", width: "65rem" }}>
                    <span class="input-group-text" id="basic-addon1">Add DateTime</span>
                    <DateTimePicker
                        className="form-control"
                        value={datetime}
                        onChange={(newDateTime) => setDateTime(new Date(newDateTime))}
                    />
                </div>
                {/* Submit Button */}
                <input type="submit" value="Add List" className="btn btn-dark d-block mx-auto mt-3"></input>
            </form>
        </div>
    )
}

export default AddList;