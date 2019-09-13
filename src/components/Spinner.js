import React from 'react'
import {Row,
        Col} from 'react-bootstrap'
import Loader  from 'react-loader-spinner'

//

const Spinner = () => {
    return <>
        <Row className='align-items-center' style={{
            height : '500px'
        }}>
            <Col xs={6} className='mx-auto text-center'>
                {/* <img  className='img-fluid' src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> */}
                
                    <Loader
                        type="Bars"
                        color="#212121"
                        height={100}
                        width={100}
                        // timeout={3000} //3 secs
                    />
                
            </Col>
        </Row>
        
    </>
}

export default Spinner