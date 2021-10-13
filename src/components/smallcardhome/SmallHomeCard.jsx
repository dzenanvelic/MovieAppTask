import React  from 'react'
import './smallhomecard.scss'
import {Star}from '@material-ui/icons'
import {Link, useParams}from 'react-router-dom'
function SmallHomeCard({home}) {
//console.log("serie",movie)
const id = home.id
  // console.log("ID",id)
    return (
        /* link to single movie */
        <Link className="linkSingleCard" to={`/${id}`}>
        <div className="homeCard">
        {/* home card image */}
            <img src={`http://image.tmdb.org/t/p/w500/${home.poster_path}`} alt="home" />
           <div className="image"></div>
           <div className="description">
           {/* rating on single home card */}
               <h5 className="ratingStar"><Star className="iconStar"/>{home.vote_average}</h5>
              {/*  <h3>{home.title}</h3> */}
               

           </div>
        </div>
        </Link>
        
    )
}

export default SmallHomeCard
