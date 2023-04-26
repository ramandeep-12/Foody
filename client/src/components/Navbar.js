import React,{useContext, useState} from 'react'
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart'
import { Link ,useNavigate} from "react-router-dom"
import { CartState } from '../components/CartProvider'

import Modal from '../Modal'
function Navbar() {
  const history=useNavigate()

  const[cartView,setCartView]=useState(false)

const handlelogout=()=>{
localStorage.removeItem("authtoken")
history('/login')
}

let state=useContext(CartState)
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark text-white bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">FastFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">

              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {(localStorage.getItem("authtoken")) ? <li className="nav-item">

              <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
            </li> : ""}

          </ul>
          {!localStorage.getItem("authtoken") ?
            (<div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
            </div>)
            : <div className='d-flex'>
            <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)} >My Cart {" "} <Badge pill bg="danger">{state.length}</Badge> </div>
            {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
            <div className="btn bg-white text-danger mx-2" onClick={handlelogout}>Logout</div>
            </div>
            }
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar