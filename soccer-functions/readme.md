# Create a new project

# install cloud functions framework
npm i @google-cloud/functions-framework

# create an index.js file
```js
const functions = require('@google-cloud/functions-framework');
functions.http('my-cloud-function', async (req, res) => {
  console.log('my cloud function called')
  res.send({status:'OK', message: 'my cloud function result' })
})
```

# Deployment
gcloud functions deploy load-openliga-data --runtime nodejs20 --trigger-http --region europe-west3

# Test locally
npx functions-framework --source=. --target=load-openliga-data