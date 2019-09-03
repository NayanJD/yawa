import {Col,
    Row,
    Container,
    InputGroup,
    FormControl,
    Button} from 'react-bootstrap'
import classnames from 'classnames'
import React,
    {useRef, useEffect, useState} from 'react'
import {ResponsiveContainer,
        LineChart,
        XAxis,
        YAxis,
        Legend,
        Line,
        CartesianGrid,
        Tooltip} from 'recharts'
import {getStockTimeSeries} from '../api/WeatherDataApi'

const getStockGraph = (data) => {

    return (//<ResponsiveContainer width={700} height='100%' >
                <LineChart  width={750} height={250} data={data}
                    margin={{ left: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis type="number" domain={['dataMin', 'dataMax']}/>
                    <Tooltip />
                    <Legend />
                    {/* <Line type="monotone" dataKey="open" stroke="#8884d8" /> */}
                    <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                </LineChart>
            //</ResponsiveContainer>
    )
}
const TemperatureDaily = ({data}) => {
    console.log('Temperature Graph Component Loaded')
    console.log(data)
    return <>
        {getStockGraph(data)}
            
    </>   
}

export default TemperatureDaily