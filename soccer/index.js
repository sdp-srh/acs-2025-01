/**
 * this module handles all http request to our soccer app
 * It returns the data as json
 */

// include libraries for microservices and file handling
const express = require('express')

const fs = require('fs')
const path = require('path')
// library for reading the .env file
require('dotenv').config()


// start express app
const app = express()
const port = process.env.PORT || 3000
// include body parser for easier handling of json in the request
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


// formatting of the responses
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('<h1>Soccer app is running</h1>')
})

// gets all teams
app.get('/api/team', async (req, res) => {
  const rawData = fs.readFileSync('./data/olteams.json')
  const teams = JSON.parse(rawData)
  res.send(teams) 
})



// profile will be loaded only for logged in and verified users
app.get('/api/profile/', (req, res) => {
  // TODO should be loaded from a database
  const profile = {
    name: 'Paul',
    mail: 'paul.tanzer@live.de',
    location: 'Heidelberg'
  }
  res.send(profile)
})




/**
 * initializing app
 */
app.listen(port, () => {
  console.log(`Soccer app is starting at ${port}`)
  console.log('Soccer app running')
})

