import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home(props) {
  const [item, setItem] = useState([])
  const [category, setCategory] = useState([])
  const[search,setSearch]=useState("")
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/food", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      }
    })
    response = await response.json()
    console.log(response[0], response[1])
    setItem(response[0])
    setCategory(response[1])

  }
  
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id="carousel" style={{"min-height": "20%"}}>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit" onSubmit={trigger}>Search</button> */}
    </div>
    </div>
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-md-block w-100" style={{filter:"brightness(30%)",objectFit:"fill" }} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×700/?garlicbread" className="d-block w-100" style={{filter:"brightness(30%)",objectFit:"fill"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{filter:"brightness(30%)",objectFit:"fill"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
      <div className='container'>
        {
          category!==[]?category.map((data)=>{
            return(
              <div className='row'>
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
            <hr/>
            {item!==[]?item.filter((i)=>(i.CategoryName===data.CategoryName)&& (i.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems=>{
                return(
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                     <Card  fooditem={filterItems} options={filterItems.options}/>
                      </div>
                )
            }):<div>No such data found</div>}
</div>
            )
          }):""
        }
</div>
      <div><Footer /></div>
    </div>
  )
}
