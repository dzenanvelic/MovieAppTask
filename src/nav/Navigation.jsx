import React, { useEffect, useState } from 'react'
import{Link}from 'react-router-dom'
import{Search} from '@material-ui/icons'
import './navigation.scss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
function Navigation() {
    const[filterMovies,setFilterMovies]=useState('')
    
//console.log("FILTER MOVIES",filterMovies)
const dispatch = useDispatch()
dispatch({type:'SEARCH_QUERY',payload:filterMovies})
   

    return (
        <nav>
            <div className="logo-nav">
<h2>IMDB</h2>
<ul>
    <li><Link className="linkNav" to='/'>Home</Link></li>
    <li><Link className="linkNav" to='/movies'>Movies</Link></li>
    <li><Link className="linkNav" to='/series'>Series</Link></li>
</ul>
            </div>
           
            
        </nav>
    )
}

export default Navigation
