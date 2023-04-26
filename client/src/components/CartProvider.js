import React, { createContext, useReducer } from 'react'
const CartDispatch = createContext()
const CartState = createContext()
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        //    console.log(state)
        case "UPDATE":

            let arr = [...state]
            console.log(arr)
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qty: parseInt(action.count) + food.qty, price: action.price + food.price }
                }
            })
            return arr
        case "DROP":
            let empArray=[]
            return empArray
        default: return state
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatch.Provider value={dispatch}>
            <CartState.Provider value={state}>
                {children}
            </CartState.Provider>
        </CartDispatch.Provider>
    )
}

export { CartProvider, CartState, CartDispatch }
