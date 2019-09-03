import {
    mapAddrToUrl
} from './apiConfig'

export const getWeatherData = (addr) => {
    return new Promise((resolve,reject) => {
        fetch(mapAddrToUrl(addr))
            .then(data =>data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}