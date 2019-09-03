import {Col,
    Row,
    Dropdown} from 'react-bootstrap'
import classnames from 'classnames'
import React,
    {useRef, useEffect, useState} from 'react'
import TemperatureDaily from './TemperatureDaily'

const days = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat']

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const getGraph = (data,x,y) => {
    if(y === 'Temperature' && x === 'daily'){
        y = 'temperatureHigh'
        x='temperatureHighTime'
    }else{
        y = y.toLowerCase()
        x = 'time'
    }
    console.log('y ' + y)
    console.log('x ' + x)
    console.log(data)

    let now
    return <TemperatureDaily 
                data={data.map((item,index) => {
                    //console.log(item.temperatureHighTime)
                    if(x ==='daily')
                        return {x : days[(new Date(item[x]*1000 )).getDay()],
                            y :item[y]}
                    else{
                        now = new Date(item[x]*1000 )
                        return {x : now.getHours() + ':' + now.getMinutes(),
                            y :item[y]}
                    }
                })}
            />
}
const StatisticsMenu = ({data}) => {

    console.log('Statistics Menu Loaded')
    
    const [menu,setMenu] = useState({y : 'Temperature', x :'daily'})

    const changeDataPoint = (type) => {
        setMenu({...menu,y : type})
    }

    return (<>
        
        <Row className='ml-2 my-2'>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {menu.y}
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>changeDataPoint('Temperature')}>Temperature</Dropdown.Item>
                        <Dropdown.Item onClick={()=>changeDataPoint('Humidity')}>Humidity</Dropdown.Item>
                        <Dropdown.Item onClick={()=>changeDataPoint('visibility')}>Visibility</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
            </Row>
            <Row className='my-2'>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${(menu.x === 'daily')?'active':''}`} href="#" onClick={() => setMenu({...menu, x : 'daily'})}>Daily</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${(menu.x === 'hourly')?'active':''}`} href="#" onClick={() => setMenu({...menu, x : 'hourly'})}>Hourly</a>
                    </li>
                </ul>
            </Row>     
            <Row className = 'my-3 overflow-auto' style={{maxWidth: '100%',maxHeight: '100%'}}>
                <Col >
                    {getGraph(data[menu.x],menu.x,menu.y)}
                </Col>
            </Row>
                
            
            
    
    </>)
}

export default StatisticsMenu