
const express = require('express')
const path = require('path')

// translation API
const { Translate } = require('@google-cloud/translate').v2

// Vertext AI
const { VertexAI } = require('@google-cloud/vertexai')

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

app.post('/api/gemini', async (req, res) => {
  // setup the vertex ai client
  const vertex_ai = new VertexAI({project: 'acs-2023-02', location: 'us-central1'})

  // get the prompt from the frontend request
  const prompt = req.body.prompt
  // configure and get the generative model
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-pro',
    generation_config: {
      'maxOutputTokens': 2048,
      'temperature': 0.9,
      'topP': 1,
      'candidateCount': 1
    }
  })
  // define the aiRequest, which will be send to the generative model
  const aiRequest = {
    contents: [{role: 'user', parts: [{text: prompt}]}]
  }

  // generate the content (aiResponse) with the generative model
  const aiResponse = await generativeModel.generateContent(aiRequest) 
  let aiAnswer = ''
  // combine the text answers (parts) to a single string (aiAnswer)
  aiResponse.response.candidates[0].content.parts.forEach((part) => aiAnswer += part.text)
  console.log(aiResponse)
  console.log(aiAnswer)
  // send the prompt and the aiAnswer back to the frontend
  res.send({prompt: prompt, answer: aiAnswer})
});



app.listen(port, async () => {
  logger.info(`test service is running on ${port}`)
})

