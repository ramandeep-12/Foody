import React, { useState,useContext,useRef, useEffect } from 'react'
import { CartState,CartDispatch} from './CartProvider'
export default function Card(props) {
    const state=useContext(CartState)
    const dispatch=useContext(CartDispatch)
    let options=props.options[0]
    let priceoption=Object.keys(options)
    const priceRef=useRef()
    let [count, setCount] = useState(1);
    const[size,setSize]=useState("")
    
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
   
    const handleIncrement = () => {
        setCount(count + 1);
    }

    
    const handleCart=async()=>{
        let food=[]
        for(const i of state){
            if(i.id===props.fooditem._id){
                food=i
                break
            }
        }
        console.log(food)
        console.log(size)
        if(food!==[]){
            if(food.size===size){
                await dispatch({type:"UPDATE",id:props.fooditem._id,price:finalPrice,count:count})
                return
            }
            else if(food.size!==size){
                await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalPrice,qty:count,size:size,img:props.fooditem.img})
        return
            }
        }
        else{
        await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalPrice,qty:count,size:size,img:props.fooditem.img})
        return
            }   
         }


    let finalPrice=count*parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"140px",objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditem.name }</h5>
                        <p className="card-text">important text</p>
                        <div className='container w-100'>
                            <button className='btn btn-primary btn-sm rounded-sm' type='button' onClick={handleDecrement}>-</button>
                            <span>{count}</span>
                            <button className='btn btn-primary btn-sm rounded-sm' type='button' onClick={handleIncrement}>+</button>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceoption.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                                }
                            </select>
                            <div className='d-inline h-100 fs-5'>Rs.{finalPrice}/-</div>
                        </div>
                        <hr/>
                        <button className="btn btn-success justify-cente ms-2" onClick={handleCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
