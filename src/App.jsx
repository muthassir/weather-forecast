import CityTable from './components/CityTable'
import Weather from './components/Weather'
import {Routes, Route} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';


function App() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleWeather =  async(id)=>{
    navigate('/weather')
    setCity(id)
  }

return (
    <>
      <div className=' flex flex-col justify-center items-center'>
        <Routes>
          <Route path='/' element={<CityTable  handleWeather={handleWeather}/>}/>
          <Route path='/weather' element={<Weather city={city}/>} />
        </Routes>
      </div>

    </>
  )
}

export default App;
