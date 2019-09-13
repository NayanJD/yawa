const weatherUrl = `https://api.themadnerd.com/weather/geocode?address=`

const mapAddrToUrl = (addr) => {
    addr = addr.replace(' ','+')
    return weatherUrl + addr
}

export {
    mapAddrToUrl
}