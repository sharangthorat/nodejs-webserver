const request = require('postman-request')

const geocode = (address,callback)=>{

    const latlongurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1Ijoic2hhcmFuZ3Rob3JhdCIsImEiOiJja3huOXhpYm0wbGE3MnZqdjl6M3FkbG96In0.vvLkYK0a0k-bGvQquedIUg&limit=1'
    
    request({ url: latlongurl, json: true }, (error, { body : {features} } ) => {

        if (error)
        {
            callback('Could not connect to api.mapbox.com',undefined)

        }else if ( features.length === 0) {

            callback('Could not find out location for address ' + address,undefined)

        }else {

            callback(undefined, {

                latitude: features[0].center[1],
                longitude: features[0].center[0],
                name: features[0].text

            })
        }

    })


}

module.exports=geocode