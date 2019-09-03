const weatherUrl = `http://notesappwithnode.ap-south-1.elasticbeanstalk.com/weather/geocode?address=`

const mapAddrToUrl = (addr) => {
    addr = addr.replace(' ','+')
    return weatherUrl + addr
}

export {
    mapAddrToUrl
}