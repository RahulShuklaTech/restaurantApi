import React, {  useState,useEffect } from 'react'


const dataForPage = (num) => {
    let start = 0;
    let end = 10;
    if (num > 1) {
        start = end * num - 10;
        end *= num;
    }
    return [start, end]
}


export const Table = ({ data }) => {
   
    const [currentPage, setCurrentPage] = useState(1);
    const [dataToShow, setDataToShow] = useState(data.slice(0, 10))

    let numberOfelements = data.length;
    let numberOfpages = Math.ceil(numberOfelements / 10);

    const handleNext = () => {
        currentPage < numberOfpages ? setCurrentPage(page => page + 1) : setCurrentPage(1)
        let [start, end] = currentPage < numberOfpages ? dataForPage(currentPage + 1) : dataForPage(1)
        let newData = data.slice(start, end)
        setDataToShow(newData)
    }

    const handlePrevious = () => {
        currentPage - 1 < 1 ? setCurrentPage(numberOfpages) : setCurrentPage(currentPage => currentPage - 1)
        let [start, end] = currentPage - 1 < 1 ? dataForPage(numberOfpages) : dataForPage(currentPage - 1)
        let newData = data.slice(start, end)
        setDataToShow(newData)
        
    }

    useEffect(() => {
        setDataToShow(data.slice(0, 10))
        setCurrentPage(1)
       
    },[data])


    return (
        <div className="table">
            <div className="header">
                <h2 className="name">Name</h2>
                <h2 className="city"> City</h2>
                <h2 className="state">State</h2>
                <h2 className="phone">Contact</h2>
                <h2 className="genre">genres</h2>
            </div>
            <div className="rows">
                {
                    dataToShow.map((element, index) =>
                        <div className="row" key={index}>

                            <p className="name">{element.name}</p>
                            <p className="city">{element.city}</p>
                            <p className="state">{element.state}</p>
                            <p className="phone">{element.telephone}</p>
                            <p className="genre">{element.genre}</p>
                        </div>
                    )
                }
            </div>
            <div className="footer"><button className = "myButton" onClick={handlePrevious}>Previous</button><h2>{currentPage}</h2><button className = "myButton" onClick={handleNext}>Next</button></div>
        </div>
    )
}
