import React, { useState } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';

export default function Signup() {
    const history=useNavigate()
    const [user,updateuser]=useState({username:"",email:"",password:"",cpassword:"",location:""})
    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name
        value=e.target.value
        updateuser({...user,[name]:value})
        console.log(user)
    }
    const postData=async(e)=>{
        e.preventDefault();
        const{username,email,password,cpassword,location}=user
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({username,email,password,cpassword,location})
        })
        const data=await response.json()
        if(!data.success){
            alert("Enter valid credentials")
        }
        else{
            window.alert("You are registered successfully")
            history("/login")
        }
    }
  return (
    
    <>
    <div className="container mt-5">
        <form method="POST">
        <div className="mb-3">
    <label htmlFor="username" className="form-label">Username</label>
    <input type="text" name='username' className="form-control" id="username" placeholder='Enter Username' value={user.username} onChange={handleInputs}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="email" placeholder='Enter your Email' value={user.email} onChange={handleInputs}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="password" placeholder='Enter Password' value={user.password} onChange={handleInputs}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" name='cpassword' className="form-control" id="cpassword" placeholder='Password' value={user.cpassword}onChange={handleInputs}/>
  </div>
  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" name='location' className="form-control" id="location" placeholder='Enter Location' value={user.location} onChange={handleInputs}/>
  </div>
  
  <button type="submit" className="btn btn-primary mr-2" onClick={postData}>Submit</button>
  <NavLink to="/login">Already Registered</NavLink>
</form>
</div>
    </>
  )
}
