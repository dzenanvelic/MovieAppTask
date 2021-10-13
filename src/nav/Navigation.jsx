import React, { useEffect, useState } from 'react'
import{Link}from 'react-router-dom'
import{Search} from '@material-ui/icons'
import './navigation.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function Navigation() {

   const dispatch=useDispatch()
    const{search }= useSelector((state=>({...state})))
    const{text}= search


   
const handleChange=(e)=>{
dispatch({type:"SEARCH_QUERY",payload:{text:e.target.value}})
}
    return (
        <nav>
           
             <div className="logo-nav">
 
      <Link className="logoNavLink" to="/">      
<h2>TMDB</h2>
 </Link>

<ul>
    <li><Link className="linkNav" to='/'>Home</Link></li>
    <li><Link className="linkNav" to='/movies'>Movies</Link></li>
    <li><Link className="linkNav" to='/series'>Series</Link></li>
</ul>
            </div>
           
            <div className="search">
               
                <input type="text" placeholder="search " value={text} onChange={handleChange}/>
            </div>
        </nav>
    )
}

export default Navigation
