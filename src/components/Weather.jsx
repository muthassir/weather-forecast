import Axios from 'axios'
import { FaWind, } from 'react-icons/fa'
import { WiHumidity} from 'react-icons/wi'
import {FaTemperatureEmpty} from 'react-icons/fa6'
import { IoSpeedometerOutline} from 'react-icons/io5'
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import rain from '../assets/rainy.png'
import cloud from '../assets/cloudy.png'
import clear from '../assets/sunny.png'


const KEY = '82586183e644c15e16c3f310c44dab1b'


const Weather = ({city}) => {
    const [loading, setLoading] = useState(false)
    const [country,setCountry] = useState('')
    const [temp,setTemp] = useState('')
    const [humidity,setHumidity] = useState('')
    const [wind,setWind] = useState('')
    const [data, setData] = useState([])
    const [weatherDesc, setWeatherDesc] = useState('')

    const navigate = useNavigate()
    useEffect(()=>{
       

        const getData = async()=>{
            try {
                const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${KEY}`)
                setCountry(response.data.city.country)
                setTemp(response.data.list[0].main.temp)
                setHumidity(response.data.list[0].main.humidity)
                setWind(response.data.list[0].wind.speed)
                setData(response.data.list)
                setWeatherDesc(response.data.list[0].weather[0])
                setLoading(true)
            } catch (error) {
                console.log(error, "cant get");
                setLoading(true)
            }
        }
        getData()

      
    },[])

     // days
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wendnesday','Thursday','Friday','Saturday']
    const todayIndex = new Date().getDay()
    const today = days[todayIndex];
   
    const nextFiveDays = [...Array(5)].map((_, i) => {
        const nextIndex = (todayIndex + i + 1) % 7; 
        return days[nextIndex];
      });
      const dayDivs = nextFiveDays.map((day, index) => (
        <span key={index}>
          <span>{day}</span>
        </span>));
   
//    weather icon
   if(weatherDesc.main === 'Rain'){
    var imgs = rain
   } if(weatherDesc.main === 'Clouds'){
    var imgs = cloud
   } if(weatherDesc.main === 'Clear'){
    var imgs = clear
   } 
    
return (
    <>
    {loading ? (<div className='flex lg:flex-row flex-col lg:h-screen lg:gap-56 gap-10 justify-center items-center'>
{/* current weather */}
   <div>
    <h1 className='mt-8 md:mb-8 text-center text-3xl text-white'>Current Weather</h1>
    <div className="container h-96 bg-blue-500 flex flex-col items-center w-80 rounded lg:mt-1 mt-9">
        <div className="weather-img">
            <img src={imgs} alt="weather-img" className='h-36' />
        </div>

        <div className='flex flex-col items-center'>
            <p className='text-5xl'>{Math.round(temp)}℃</p>
            <p className='text-3xl mt-1'>{city},{country}</p>
        </div>

        <div className='flex justify-between w-72 mt-12 '>
            <div className='flex '>
                <p><WiHumidity size={28} /></p>
            <div>
                <p>{humidity}%</p>
                <p className='font-bold'>Humidity</p>
            </div>
            </div>

            <div className='flex'>
                <p><FaWind size={22}  /></p>
            <div>
                <p className='ml-2'>{Math.round(wind)}km/h</p>
                <p  className='font-bold'>Wind Speed</p>
            </div>
            </div>
        </div>
        <p className='mt-1 font-bold'>{today}</p>
    </div>
    <div className='flex justify-between py-5 px-4 mt-4'>
        <p className='text-2xl text-white'>{weatherDesc.main}</p>
        <p className='text-2xl'>-</p>
        <p className='text-2xl text-white'>{weatherDesc.description}</p>
    </div>
   </div> 
    {/* table for 5 days */}
            
        <div className=" grid grid-rows-5 mb-8">
            {data.length != 0 ? data.slice(0,5).map((item,index)=>{
                return <div key={index} className=' container flex flex-col gap-5 bg-blue-500 mt-6 p-2 rounded'>
                        <div className=' flex justify-between gap-5 '>
                            <p><span className='font-bold text-white'>{dayDivs[index]}</span></p>
                            <p className='flex'><FaTemperatureEmpty  size={21}/>{Math.round(item.main.temp)}℃</p>
                            <p className='flex'><WiHumidity size={23} />{item.main.humidity}%</p>
                        </div>
                        <div className='flex justify-between'>
                            <img src={imgs} alt="weatherImg" className='h-10'/>
                            <p className='flex'><IoSpeedometerOutline size={21} />{item.main.pressure}</p>
                           <p>{weatherDesc.description}</p>
                        </div>
                       </div>}) : (<div  className='flex flex-col justify-center'>
                                     <p className='text-3xl'>Can't get Data</p>
                                     <button className='rounded bg-blue-400 mt-3' onClick={()=>navigate('/')}>Back</button>
                                    </div>)}
        </div >
        </div>) : (<div className='flex justify-center items-center h-screen text-3xl'>Loading...</div>)}
    </>
  )
}

export default Weather;