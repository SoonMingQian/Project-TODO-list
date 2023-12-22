import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login() {

    //State variables for email, password, and navigation
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Email: " + email + " Password: " + password)
        //Create loginDetails object
        const loginDetails = ({
            email: email,
            password: password,
        })

        //Sending POST request to the server for login
        axios.post("http://localhost:4000/login", loginDetails)
            .then(result => {
                console.log(result)
                //If login is sueccessful, navigate to the List page
                if (result.data === "Success") {
                    navigate('/List')
                }else{
                    window.alert("Incorrect email or passowrd, please try again")
                }
                
            })
            .catch(err => console.log(err));
    }
    return (
        <div style={{ marginTop: '180px' }}>
            {/* Login form */}
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Email input */}
                    <div class="mb-3" >
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder='example@mail.com'
                            onChange={(e) => { setEmail(e.target.value) }}
                            style={{ width: '15rem' }}
                        ></input>
                    </div>
                    {/* Password input */}
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => { setPassword(e.target.value) }}
                            style={{ width: '15rem' }}
                        ></input>
                    </div>
                    {/* Link to singnup page */}
                    <Link to='/signup' className='btn'><p>Dont have an account?</p></Link>
                    {/* Login button */}
                    <button type="submit" class="btn btn-dark">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;