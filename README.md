# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

1. Run `yarn install` in the root of the repo
2. Create the  `/src/config/config.json` file
3. Paste the following content into the config.json file
```
{
    "dfEditIntentURL": "",
    "dfTrainingURL": "",
    "dfWebdemoURL": "",
    "googleSheetURL": "" 
}
```
4. Fill the corresponding information in `config.json`
5. `dfEditIntentURL`: Simply log into dialogflow and edit an existing intent. The URL will look something like the following: `https://dialogflow.cloud.google.com/#/agent/{AGENTID}/editIntent/`. Remove the id of the intent at the end of the URL
6. `dfTrainingURL`: Simply log into dialogflow and open the training. Copy and paste the URL.
7. `dfWebdemoUrl`: Open the dialogflow web demo (Login Dialogflow > Integrations > Webdemo), send a request and check for the URL in the Network Tab of your browser. Copy the URL and paste it in here.
8. Create a public URL for your Google Sheet, as described here: https://github.com/jsoma/tabletop#1-publishing-your-google-sheet
## Development

### `yarn install`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
