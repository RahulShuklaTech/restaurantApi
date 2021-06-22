import { useEffect, useState, useRef } from 'react';
import './App.css';
import { Table } from "./components/Table"
function App() {
  
  const ref = useRef("All")
  const [data, setData] = useState([]);
  const [dataOriginal, setDataOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState("All")
  const [searchField, setSearchField] = useState("")


  const getData = async () => {
    const response = await fetch("http://128.199.195.196:3001/", {
      "method": "GET",
      "headers": {
        "Authorization": "Bearer iqi509189dxznal;,ggi"
      }
    })

    const data = await response.json();
    const filterMap = new Set();
    data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    setDataOriginal(data);
    data.forEach(item => {
      let data = item.genre.split(",")
      data.forEach(element => {
        filterMap.add(element)
      });
      return item.genre;
    });
    const filteredArray = ["All", ...filterMap];
    setData(data);

    setFilters(filteredArray)
    setLoading(false)
    return data;
  }

  useEffect(() => {
    getData();
  }, [])



  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    searchField  === "" ? setData(dataOriginal) : searchField
  },[searchField,dataOriginal])



  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = data.filter((item) => item.name === searchField || item.city === searchField || item.genre.includes(searchField) || item.state === searchField);
    console.log(newData)
    setData(newData)
  }


  const handleChange = (e) => {
    setSelected(ref.current.value );
    let newdata =  dataOriginal.filter(item => item.genre.includes(ref.current.value))
    console.log("bew data",newdata)
    if(ref.current.value === "All"){
      console.log(dataOriginal)
      setData(dataOriginal)
    }else{
      setData(newdata)
    }
} 



  if (loading) return <h1>Getting data for you</h1>
  return (
    <div className="App">
      <div className="topRow">

        <input type="text" className = "input" value={searchField} onChange={(e) => setSearchField(e.target.value)} placeholder="Enter Cuisine" />
        <button className = "myButton" onClick={handleSubmit}>Submit</button>
        <label htmlFor="genres">Choose a Cuisine:</label>

        <select ref={ref} name="genres" value={selected} onChange={handleChange} >
          {
            filters.map(item => <option key={item}value={item}>{item}</option>)

          }

        </select>
      </div>
      {!loading && <Table data={data} filters={filters} setData={setData} reffer = {ref}/>}


    </div>
  );
}

export default App;
