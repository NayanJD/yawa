import {Col,
        Row,
        Container,
        InputGroup,
        FormControl,
        Button} from 'react-bootstrap'
import classnames from 'classnames'
import React,
        {useRef,
        useState,
        useEffect} from 'react'
import {TimelineLite} from 'gsap'
import WeatherDataArea from './WeatherDataArea'



const App = (props) => {
    const inputEl = useRef(null)
    const searchCol = useRef(null)
    

    //Keep size state for windows
    const [windowSize, setWindowSize] = useState({width : window.innerWidth})

    const [cityname, setCityname] = useState('')

    const [weatherDisplayArea,setWeatherDisplayArea] = useState(<WeatherDataArea city=''/>)

    const getDataOnClick = () =>{
        // console.log(inputEl.current.value)
        setCityname(inputEl.current.value)
    }
    
    const tree = new TimelineLite()

    const resizeListener = () => {
        // console.log(window.innerWidth)
        setWindowSize({
            width : window.innerWidth,
            height : window.innerHeight
        })
    }

    //The Effect to detect window width and height for small devices
    useEffect(() => {

        console.log('App.js loaded')

        //listener for enter keypress
        document.addEventListener('keydown',e => e.code === 'Enter' ? getDataOnClick():'nothing')

        window.addEventListener('resize',resizeListener)

        inputEl.current.focus()

        return () => {
            window.removeEventListener('resize',resizeListener)
        }
    },[])

    
    useEffect(() => {
        // console.log('cityname changed')
        setWeatherDisplayArea(<WeatherDataArea city={cityname}/>)
    },[cityname])

    const searchInputOnFocus = () =>{

        //prevent search resizing animation for xs devices
        if(windowSize !== null && windowSize.width > 768)
            tree.to(searchCol.current,0.7,{
                flex: '0 0 41.666667%',
                maxWidth: '41.666667%',
                marginLeft: '25%'})
    }

    const searchInputOnBlur = () => {
        if(windowSize !== null && windowSize.width > 768)
            tree.to(searchCol.current,0.7,{
                flex: '0 0 25%',
                maxWidth: '25%',
                marginLeft: '41.666667%'})
    }

    const searchValue = (e) => {
        // console.log(e.target.value)
        //setCityname(e.target.value)
    }

    return( <>
            <Container fluid='true'>
            <Row className='bg-dark py-0'>
                <Col xs={12} md={4} className={classnames('text-center','finapp-header','py-auto')}>
                    <span className='h1'>
                        YAWA
                    </span>
                    <small className='text-muted'>yet another weather App</small>
                    
                </Col>
                
                <Col xs={12} md={{span : 3, offset:5}} ref={searchCol}>
                    <InputGroup className="mt-md-2 mb-3">
                        
                        <FormControl
                            placeholder="Enter the city"
                            aria-label="Username"
                            aria-describedby="basic-addon1" 
                            className='bg-dark search-input'
                            style={{color:'white'}}
                            onFocus={searchInputOnFocus}
                            onBlur={searchInputOnBlur}
                            onChange={searchValue}
                            ref={inputEl}
                        />
                        <InputGroup.Append>
                            <Button 
                                type='submit' 
                                className="btn" 
                                variant="light"
                                onClick={getDataOnClick}>Get Data</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            
            {weatherDisplayArea}
        
            
            </Container>
            <footer className="footer">
            <div className="text-center">
                <span className="text-muted ">
                    <a  target='_blank'href='https://darksky.net/poweredby/'>Powered by Dark Sky</a>
                </span>
            </div>
            </footer>
        
        </>
        
    )
}

export default App