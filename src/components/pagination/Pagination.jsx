import React, { useState } from 'react'
import './pagination.scss'
function Pagination({totalNumberMovies,currentPage,setCurrentPage}) {

//set items per page
    const[itemsPerPage,setItemsPerPage]= useState(20)
//for showing limited number pages
const [pageNumberLimit,setPageNumberLimit]=useState(5)
const [maxPageNumberLimit,setMaxPageNumberLimit]=useState(5)
const [minPageNumberLimit,setMinPageNumberLimit]=useState(0)

//handleClick
const handleClick=(e)=>{
    setCurrentPage(Number(e.target.id));
    //console.log(e.target.id)
}
//total number of pages
const pages =[];
for(let i=1; i<= Math.ceil(totalNumberMovies /itemsPerPage);i++){
    pages.push(i)
}
const renderedPageNumbers = pages.map((number)=>{
    if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
         return (
        <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
{number}
        </li>
    )
    }else{
        return null;
    }
   
})
    //next page
    const handleNext=()=>{
        setCurrentPage(currentPage + 1)
        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
}
//previous page
    const handlePrev=()=>{
setCurrentPage(currentPage - 1)
 if((currentPage - 1)%pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    }
//increment page button
    let pageIncrementButton=null;
    if(pages.length > maxPageNumberLimit){
        pageIncrementButton = <li onClick={handleNext}>&hellip;</li>
    }
    //decrement page button
    let pageDecrementButton=null;
    if(pages.length > maxPageNumberLimit){
        pageDecrementButton = <li onClick={handlePrev}>&hellip;</li>
    }
    return (
         <div className="pagination">
              <ul className="pageNumbers">
                  <li>
                      <button onClick={handlePrev} disabled={currentPage === pages[0] ? true : false}>
                          Prev
                      </button>
                  </li>
                  {pageDecrementButton}
                    {renderedPageNumbers}
                    {pageIncrementButton}
                     <li>
                      <button onClick={handleNext}disabled={currentPage === pages[pages.length-1] ? true : false}>
                         Next
                      </button>
                  </li>
              </ul>
       
          </div>
    )
}

export default Pagination
