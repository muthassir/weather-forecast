import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CityTable = ({handleWeather}) => {
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const apiUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'

    useEffect(()=>{
       

          const fetchData = async()=>{
              try {
                  const response = await axios.get(apiUrl)
                  const datas = response.data.results
                  setCities(datas)
                  setLoading(true)
              } catch (error) {
                  console.log(error, "error get");
                  setLoading(false)
              }
          }
          fetchData()

    },[])

    // search
    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()));

return (
    <>
    <h1 className='mt-6  font-bold  text-3xl'>Weather Forecast</h1>
    {/*search*/}
      <div className="mt-9 flex justify-center ">
          <input
            type="text"
            placeholder="Search city..."
            className="px-8 py-2 border rounded-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
      </div>

   {/*city Table  */}
  {loading ? ( <div className="tab overflow-x-scroll overflow-y-scroll mt-16 h-96 lg:w-[800px]  w-64  rounded bg-white">
      <table className="w-full table-auto" >
            <thead className='bg-green-400 sticky top-0'>
              <tr >
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">Population</th>
                <th className="px-4 py-2">Time Zone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.length != 0 ? filteredCities.map((city) => (
                <tr key={city.geoname_id} onClick={() => handleWeather(city.name)} >
                  <td className="border px-4 py-2 bg-white hover:bg-slate-500 cursor-pointer">{city.name}</td>
                  <td className="border px-4 py-2 bg-white">{city.cou_name_en }</td>
                  <td className="border px-4 py-2 bg-white">{city.population}</td>
                  <td className="border px-4 py-2 bg-white" >{city.timezone}</td>
                </tr>
              )) : (<div className='text-3xl mt-36 ml-64'>Can't get Data</div>)}
            </tbody>
      </table>
    </div> ) : (<div className='mt-16 text-3xl'>Loading...</div>)}
  </> 
  )
}

export default CityTable;