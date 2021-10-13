import React, { useEffect, useState } from 'react'

import axios from 'axios'
import './series.scss'
import{useSelector} from 'react-redux'
import Pagination from '../../components/pagination/Pagination'
import SerieCard from '../../components/seriecard/SerieCard'


function Series() {
    //set loading
    const [loading,SetLoading]=useState(false)

    /* set best movies */
    const [bestSeries,setBestSeries]= useState([])

    //current page in pagination
const[currentPage,setCurrentPage]= useState(1)
//redux for search
const{search}= useSelector((state)=>({...state}));
const {text}=search
    



//total number of pages
const [totalNumberSeries,setTotalNumberSeries]=useState(null)









    /* get best movies from API */
    /*  useEffect(()=>{

        const getPopularMovies=async()=>{

try {
    SetLoading(true)
   const bestMovies =  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}`)
   
  setBestMovies(bestMovies.data.results)
  setTotalNumberMovies(bestMovies.data.total_results)
  SetLoading(false)
} catch (error) {
    SetLoading(false)
    console.log("ERROR FETCHING BEST MOVIES",error)
}
           
            
        }
getPopularMovies()
    },[currentPage ]) */
//console.log(bestMovies)
    /* get best series from API */
     useEffect(()=>{

        const getPopularSeries=async()=>{

try {
    SetLoading(true)
   const bestSeries =  await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}`)
   console.log("BEST series",bestSeries.data)
   
   setBestSeries(bestSeries.data.results) 
  setTotalNumberSeries(bestSeries.data.total_results)
  SetLoading(false)
} catch (error) {
    SetLoading(false)
    console.log("ERROR FETCHING BEST SERIES",error)
}
           
            
        }
getPopularSeries()
    },[currentPage ])
//console.log(bestMovies)



//set movies from search
useEffect(()=>{
    const getSearchedSeries=async()=>{
    try {
      const searchedSeries =  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a7e6b68f84ecc27a2ef86b36e96d5d56&language=en-US&page=${currentPage}&include_adult=false&query=${text}`) 
if(searchedSeries){
    setBestSeries(searchedSeries.data.results)

    setTotalNumberSeries(searchedSeries.data.total_results)
}
    } catch (error) {
        console.log("FILTER MOVIES ERROR",error)
        
    }
}
getSearchedSeries()
    },[text,currentPage])

    
    return (
        <div className="newSeriesList">
            <h1 className="bestSeriesHeader">Best Series</h1>
 

          <div className="newSeriesListWrapper">

{
loading ? (<h1>Loading...</h1>) :
(bestSeries.map((serie)=>{
    return <SerieCard key={serie.id} serie={serie}/>
}))

}

          </div>
        {/*   pagination */}
         <Pagination totalNumberSeries={totalNumberSeries} currentPage={currentPage}setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default Series

