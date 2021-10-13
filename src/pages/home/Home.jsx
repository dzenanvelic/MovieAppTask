import React, { useEffect, useRef, useState } from 'react'
import './home.scss'
import axios from 'axios'
import SmallHomeCard from '../../components/smallcardhome/SmallHomeCard'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
 import { init } from 'ityped'
function Home() {
  //set loading
    const [loading,SetLoading]=useState(false)
//list ref
const listRef=useRef()
const textRef=useRef()
    /* set best movies */
    const [bestMovies,setBestMovies]= useState([])
    //slide number
    const[slideNumber,setSlideNumber]= useState(0)
    //typrd letters
      useEffect(()=>{
init(textRef.current,{

backDelay:1800,
backSpeed:100,
showCursor:true,
strings:["Movies","TV Shows"]
})
    },[])
/* get best movies from API */
     useEffect(()=>{

        const getPopularMovies=async()=>{

try {
    SetLoading(true)
   const bestMovies =  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=1`)
  // console.log("BEST MOVIES",bestMovies.data)
  setBestMovies(bestMovies.data.results)
  
  SetLoading(false)
} catch (error) {
    SetLoading(false)
    console.log("ERROR FETCHING BEST MOVIES",error)
}
           
            
        }
getPopularMovies()
    },[ ])
    //slide left or right
const handleClick=(direction)=>{
    let distance = listRef.current.getBoundingClientRect().x -50
if(direction ==="left" && slideNumber > 0){
    setSlideNumber(slideNumber -1)
    if(window.innerWidth > 1361){
        listRef.current.style.transform =`translateX(${710 + distance}px)`
    }
     if(window.innerWidth > 1171 && window.innerWidth  < 1361){
        listRef.current.style.transform =`translateX(${580 + distance}px)`
    } 
     if(window.innerWidth > 966 && window.innerWidth  < 1171){
        listRef.current.style.transform =`translateX(${580 + distance}px)`
    } 
     if(window.innerWidth > 776 && window.innerWidth  < 966){
        listRef.current.style.transform =`translateX(${510 + distance}px)`
    } 
     if(window.innerWidth > 576 && window.innerWidth  < 776){
        listRef.current.style.transform =`translateX(${430 + distance}px)`
    } 
     if( window.innerWidth  < 576){
        listRef.current.style.transform =`translateX(${430 + distance}px)`
    } 
     

}
if(direction ==="right" && slideNumber < 4){
     setSlideNumber(slideNumber +1)
     if(window.innerWidth >1361){
         listRef.current.style.transform =`translateX(${-710 + distance}px)`
     }
     if(window.innerWidth > 1171 && window.innerWidth  < 1361){
         listRef.current.style.transform =`translateX(${-580 + distance}px)`
     }
     if(window.innerWidth > 966 && window.innerWidth  < 1171){
         listRef.current.style.transform =`translateX(${-580 + distance}px)`
     }
    if(window.innerWidth > 776 && window.innerWidth  < 966){
        listRef.current.style.transform =`translateX(${-510 + distance}px)`
    } 
    if(window.innerWidth > 576 && window.innerWidth  < 776){
        listRef.current.style.transform =`translateX(${-430 + distance}px)`
    } 
    if(window.innerWidth  < 576){
        listRef.current.style.transform =`translateX(${-430 + distance}px)`
    } 

}
}


    //console.log(window.innerWidth)
    return (
        <div className="home">
           
                 <h1> Best <span ref={textRef}></span></h1>
         
           
        
        {/*  <div className="slider">
             <div className="sliderBox">
                 {
loading ? (<h1>Loading...</h1>) :
(bestMovies.map((latestmovie)=>{
    return <SmallHomeCard key={latestmovie.id} home={latestmovie}/>
}))

}   
             </div>
          <a  className="switchLeft sliderButton">L</a>
          <a  className="switchRight sliderButton">R</a>
         </div> */}
         <div className="slider2">
                <ArrowBackIosOutlined className="sliderArrow left" onClick={()=>handleClick("left")}/>
                 <ArrowForwardIosOutlined  className="sliderArrow right"onClick={()=>handleClick("right")}/>
             <div className="sliderBox2" ref={listRef}>
                 {
loading ? (<h1>Loading...</h1>) :
(bestMovies.map((latestmovie)=>{
    return<SmallHomeCard key={latestmovie.id} home={latestmovie}/>
        
}))

}   
             </div>
     

         </div>
    {/*  <div>
        <h2>Pause On Hover</h2>
       <Slider {...settings}>
          {
loading ? (<h1>Loading...</h1>) :
(bestMovies.map((latestmovie)=>{
 
    return <SmallHomeCard key={latestmovie.id} home={latestmovie}/>
    
    

   
}))
 
}   
    </Slider>      
       
      </div> */}


       

        </div>
    )
    
 
}

export default Home
