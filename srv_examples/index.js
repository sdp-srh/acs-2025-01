
const express = require('express')
const path = require('path')

// translation API
const {Translate} = require('@google-cloud/translate').v2
// use winston as logger
const winston = require('winston');
// Imports the Google Cloud client library for Winston
const { LoggingWinston } = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();

// start express app with the port from the environment or 3000 for local development
const app = express()
const port = process.env.PORT || 3000

// initialize winston logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    // Add Cloud Logging
    loggingWinston,
  ],
});

// enable json parsing
app.use(express.json())

// enable express to act as webserver for files in folder "public"
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/info', async (req, res) => {
  res.send('<h1>Welcome to our service (API)</h1><h2>here we provide some examples</h2><p>Version 0.1</p>')
})

// translation post endpoint for german to english
app.post('/api/de2en', async (req, res) => {
  const source = req.body.source
  const translate = new Translate()
  const options = {from: 'de', to: 'en'}
  const [translationResult] = await translate.translate(source, options)
  res.send({translation: translationResult})
})


//  translation post endpoint for english to german
app.post('/api/en2de', async (req, res) => {
  const source = req.body.source
  const translate = new Translate()
  const options = {from: 'en', to: 'de'}
  const [translation] = await translate.translate(source, options);
  res.send({translation: translation})
})

app.post('/api/translate', async (req, res) => {
  const source = req.body.source
  const from = req.body.from
  const to = req.body.to
  const translate = new Translate()
  const options = {from: from, to: to}
  const [translation] = await translate.translate(source, options);
  res.send({translation: translation})
})


// test of logging
app.get('/test/loginfo', async (req, res) => {
  const msg = `Log Info: ${new Date().toISOString()}`
  logger.info(`${msg}`)
  res.send(`<h1>${msg}</h1>`)
})

app.get('/test/logerror', async (req, res) => {
  const msg = `Log Error: ${new Date().toISOString()}`
  logger.error(`${msg}`)
  res.send(`<h1>${msg}</h1>`)
})


app.listen(port, async () => {
  logger.info(`test service is running on ${port}`)
})

