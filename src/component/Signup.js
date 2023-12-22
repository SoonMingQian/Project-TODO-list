import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Signup() {

    //State variables for name, email, password, and navigation
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    //Function to handle form submission
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("Name: "+name+ " Email: "+email+" Password: "+password)
        //Creating signupDetails object
        const signupDetails = ({
            name:name,
            email:email,
            password:password,
        })

        //Sending POST request to the server for signup
        axios.post("http://localhost:4000/signup",signupDetails)
        .then(result => {
            console.log(result)
            if(result.data === "Used"){
                window.alert("Email has been used")
            //If signup is successful, navigate to the login page
            }else{
                console.log('Navigate to login page')
                navigate('/')
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div style={{ marginTop: '130px' }}>
            {/* Signup form */}
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Name input */}
                <div class="mb-3" >
                        <label class="form-label">Name</label>
                        <input type="text"
                            class="form-control"
                            id="exampleInputName"
                            placeholder='John Wick'
                            onChange={(e) => { setName(e.target.value) }}
                            style={{ width: '15rem' }}
                        ></input>
                    </div>

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

                    {/* Link to lohin page */}
                    <Link to='/' className='btn'><p>Already have an account?</p></Link>
                    {/* Signup button */}
                    <button type="submit" class="btn btn-dark">Signup</button>
                </div>
            </form>
        </div>
        
    )
}

export default Signup;