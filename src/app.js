const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { send } = require('process')
const geocode = require('./utils/geocode')
const getweather = require('./utils/getweather')

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))

app.use(express.static(path.join(__dirname, '../public')))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/index', (req, res) => {
    res.render('index')
}
)

app.get('', (req, res) => {
    res.render('index')
}
)

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Sharang',
        city: 'Boston'

    })
}
)

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        res.send('Error !! Address is required.')

    } else {


        geocode(req.query.address, (error, data) => {

            if (!error) {

                getweather(data, (error, { location, description, temperature, feelslike } = {}) => {

                    if (error) {

                        res.send(error)

                    } else {
                        res.send({

                              "location": location,
                              "description": description,
                              "temperature": temperature,
                              "feelslike": feelslike

                        })

                    }

                })

            } else {

                res.send(error)

            }

        })


    }
})


app.listen(port, () => {
    console.log('Server is listening on port : ' + port + ' !!!')
})