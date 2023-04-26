import React, { createContext, useReducer } from 'react'
import Card from './Card'
export const CounterContext=createContext("")
const initialState=[];
const reducer=(state,action)=>{
  console.log(state,action)
    switch(action){
        case 'ADD':
     return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]

default:return state
    }
}

export default function Contest() {
    const[state,dispatch]=useReducer(reducer,initialState)
    console.log("dispatch:"+ state+ dispatch)
  return (
    <CounterContext.Provider value={{ state,dispatch }}>
    <div>

      <Card />

    </div>

  </CounterContext.Provider>
  )
}
 
// export default function Contest() {
//   return (
//     <div>Contest</div>
//   )
// }
