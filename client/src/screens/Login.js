import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
export default function Login() {
  const history=useNavigate()
  const [user,updateuser]=useState({email:"",password:""})
    let name,value;
    const handleInputs=(e)=>{
        name=e.target.name
        value=e.target.value
        updateuser({...user,[name]:value})
        console.log(user)
    }
    const postData=async(e)=>{
        e.preventDefault();
        const{email,password}=user

        const response=await fetch("http://localhost:5000/api/login",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({email,password})
        })
        const data=await response.json()
        if(response.status===400){
            alert("invalid credentials")
        }
        else{
            // window.alert(data.error)
            localStorage.setItem("userEmail",email)
            window.alert("login successfully")
            localStorage.setItem("authtoken",data.authtoken)
            console.log(localStorage.getItem('authtoken'))
            history("/")
            }
      }
  return (
    <>

    <div className="container mt-5">
        <form  method="POST">
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" id="email" placeholder='Enter your Email' value={user.email} onChange={handleInputs}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="password" placeholder='Enter Password' value={user.password} onChange={handleInputs}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
  <NavLink to="/createuser">Not Registered Yet</NavLink>
</form>
</div>
    </>
  )
}
