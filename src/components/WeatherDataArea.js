import {Col,
    Row,
    Dropdown} from 'react-bootstrap'
import classnames from 'classnames'
import React,
    {useRef, useEffect, useState} from 'react'
import {TimelineLite} from 'gsap'
import {getLatLong, getWeatherData} from '../api/WeatherDataApi'
import StatisticsMenu from './StatisticsMenu.js'
import TemperatureDaily from './TemperatureDaily';


const Night = require('../images/night.png')

const days = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat']

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const timerDisplay = (millis,tz) => {
    let date = new Date(millis*1000)
    const [localedate,localetime] = date.toLocaleString('en-US',{timeZone : tz}).split(',')
    
    const [hour,minutes,seconds] = localetime.split(':')
    
    return `${localedate}, ${hour}:${minutes}:${seconds}` 
}

const getWeatherLayout = (data,timerRef) => {

   

    if(data === null)
        return emptyCitynameText()
    
    let currently = data.currently
    let daily = data.daily.data
    let hourly = data.hourly.data

    return <>
        {/* <img src={Night} alt="Logo" />; */}
            <Row className=''>
                <Col xs={12} md={8} className='' >
                    <h1 className = 'font-weight-light'>
                        {data.formatted_address}
                    </h1>
                </Col>
                <Col xs={12} md={4} ref={timerRef} className='' style={{fontSize : '2rem'}}>
                    {}
                </Col>
            </Row>
            <Row className=''>
                <Col xs={6} md={2} className = 'font-weight-light'>
                    Summary : {currently.summary}
                </Col>
                <Col xs={6} md={2} className = 'font-weight-light'>
                    Temperature : {currently.apparentTemperature}
                </Col>
                <Col xs={6} md={2} className = 'font-weight-light'>
                    Humidity : {currently.humidity}
                </Col>
            </Row>
            
            <StatisticsMenu data={{daily : daily, hourly : hourly}} />
        
    </>
}
//<StatisticsMenu data={{daily : daily, hourly : hourly}} />
const emptyCitynameText = () => {
    return <p className='font-weight-light description' style={{fontSize : '2rem',textAlign :'center'}}>
            This is <span className='font-weight-bold font-italic'>"Yet Another Weather App"</span> built using DarkSky Api and Google Geocoding Api to learn ReactJs. Enter any city name above in the searchbox to get the weather and other useful data in the area. <span className = 'font-italic'>Cheers!</span>
            
        </p>

}
const WeatherDataArea = ({city}) => {

    const [cityDetail,setCityDetail] = useState(null)

    const timerRef = useRef(null)

    let weatherLayout

    useEffect(()=> {
        console.log('City Changed')
        if(city !=='')
            getWeatherData(city)
                .then(data => {
                    // console.log(data)
                    setCityDetail({...data})
                })
                .catch(err => console.log(err))
    },[city])

    let timerInterval,initialTime
    useEffect(() => {
        console.log('City detail changed')
        console.log(cityDetail)
        if(cityDetail){
            initialTime = cityDetail.currently.time 
            timerInterval = setInterval(() => {
                timerRef.current.innerHTML = timerDisplay(initialTime,cityDetail.timezone)
                initialTime = initialTime + 1
                // counter = 1 - counter
            },1000)

            return () => {
                clearInterval(timerInterval)
            }
        }
    },[cityDetail])
    
    weatherLayout = getWeatherLayout(cityDetail,timerRef)

    return (<>
            <Row className='my-1 overflow-auto' style={{maxHeight:'500px'}}>
                <Col>
                    {weatherLayout}  
                </Col>
                
            </Row>

    </>)
}


export default WeatherDataArea