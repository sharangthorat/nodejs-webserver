request = require('postman-request')

const getweather = ( {latitude , longitude , name:location },callback)=> {

   

      if (latitude !== undefined && longitude !== undefined)
      {
         const url = 'http://api.weatherstack.com/current?access_key=3687d07d127b94c4e5d706bc2cdc99fc&query=' + latitude + ',' + longitude + '&limit=1'

         request({ url: url, json: true }, (error, response) => {

             if (error)
             {
                callback('Cannot connect to weatherstack for weather data',undefined) 

             }else if ( response.body.current === 'undefined')
             {
                
               callback('No weather data located',undefined) 

             }else {

               callback(undefined, {

                     description: response.body.current.weather_descriptions[0],
                     temperature: response.body.current.temperature,
                     feelslike:  response.body.current.feelslike,
                     location: location

               })
             }  
           
          })

      }else
      {
         callback('Latitude and Longitude of location is undefined !!',  undefined) 
      }  

}

module.exports=getweather