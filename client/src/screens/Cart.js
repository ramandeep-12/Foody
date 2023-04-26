import React,{useContext} from 'react'
import{CartState,CartDispatch} from '../components/CartProvider'
import trash from '../images/trash.png'

export default function Cart() {
  const state=useContext(CartState)
  console.log(state)
  const dispatch=useContext(CartDispatch)
  if(state.length===0){
    return(<div><div className='m-5 w-100 text-white text-center fs-3'>The Cart is Empty! Add some items</div></div>)
  }

  const handleCheckout=async()=>{
    let email=localStorage.getItem("userEmail")
    console.log("email localstorage", email)
    let response=await fetch("http://localhost:5000/api/orderData",{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        order_data:state,
        email:email,
        order_date:new Date().toDateString()
      })
    })
    console.log("order response",response)
    if(response.status===200){
      dispatch({type:"DROP"})
    }
  }
  let totalPrice=state.reduce((total,food)=>total+food.price,0)

  return (
    <div>
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
    <table className='table table-hover'><thead className='text-success fs-4'>
    <tr>
        <th scope='col'>#</th>
        <th scope='col'>Name</th>
        <th scope='col'>Quantity</th>
        <th scope='col'>Option</th>
        <th scope='col'>Amount</th>
        <th scope='col'></th>
    </tr>
    </thead>
    <tbody className='text-light'>
      {state.map((food,index)=>(
        <tr>
          <th scope='row'>{index+1}</th>
          <td>{food.name}</td>
          <td>{food.qty}</td>
          <td>{food.size}</td>
          <td>{food.price}</td>
          <td><button type='button' className='btn p-0'><img src={trash} alt='delete'  onClick={()=>{dispatch({type:"REMOVE",index:index})}}/></button></td>

          {/* <td><button type='button' className='btn p-0'><span className="bi bi-trash" alt="delete" onClick={()=>{dispatch({type:REMOVE,index:index})}}></span></button></td> */}

        </tr>
      ))}
    </tbody></table>
    <div><h1 className='text-primary fs-2'>Total price: Rs. {totalPrice}/-</h1></div>
    <div><button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button></div>

    </div>
    </div>
  )
}
