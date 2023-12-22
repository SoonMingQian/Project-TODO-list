import React from "react"
import { useEffect, useState } from "react";
import TODOList from "./TODOList"
import SearchResults from "./SearchResults";
import axios from "axios"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'




function List() {

    //State variables
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 

    //Fetching initial data
    useEffect(
        () => {
            axios.get("http://localhost:4000/addlist")
                .then(
                    (response) => {
                        setData(response.data);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
        }, []
    )
    
    //Handling Search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        console.log("HandleSearch function is called")
        axios.get(`http://localhost:4000/search?title=${searchQuery}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    
    //Reloading data form the server
    const ReloadData = (e) => {
        console.log("reloading data")
        axios.get('http://localhost:4000/addlist')
            .then((response) => {
                setData(response.data);
                console.log("Data reloaded:", response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar className="bg-body-tertiary justify-content-between" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/list">TaskHub</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/list">My TO-DO List</Nav.Link>
                        <Nav.Link href="/addlist">Add TO-DO List</Nav.Link>
                    </Nav>
                    <Link to='/'><FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} color='white' />  </Link>
                </Container>
            </Navbar>
            {/* About section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginBottom: '25px' }}>
                <h2>About TaskHub</h2>
                <p style={{ textAlign: 'center', marginTop: '20px'}}>Welcome to TaskHub, your go-to platform for efficient task management and productivity!</p>
                <p style={{ textAlign: 'center', marginLeft: '150px',marginRight:'150px'}}>At TaskHub, we understand the challenges of staying organized in a fast-paced world. Our mission is to provide you with a simple yet powerful tool to help you manage your tasks, streamline your workflow, and boost your productivity.</p>
            </div>
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginBottom: '25px' }}>
                    <h2>TO-DO List</h2>
                </div>
                {/* Search form */}
                <form className="d-flex justify-content-center" role="search" onSubmit={handleSearch}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search Title"
                    aria-label="Search"
                    style={{ width: '15rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
                <br></br>
                {/* Displaying TODO List component */}
                <TODOList myLists={searchResults.length > 0 ? searchResults : data} Reload={ReloadData}></TODOList>
                {/* Displaying search results if available */}
                {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
            </div>
        </div>
    );
}

export default List;