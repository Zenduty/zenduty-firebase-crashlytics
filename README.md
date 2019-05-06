# Zenduty Firebase Crashlytics integration

The Zendutuy Google Firebase Crashlytics integrations lets you receive real-time alerts around mobile application crashes and notify the relevant team members and resolve mobile downtime with speed before it affects the rest of your users.
 
## Setting up the integration

- #### Create and setup the Firebase project:
	- Create a Firebase project using the [Firebase Developer Console](https://console.firebase.google.com).
	- Enable Billing on your Firebase the project by switching to the **Blaze** plan, this is currently needed to be able to perform HTTP requests to external services from a Cloud Function.
	- Include [Crashlytics in your project](https://firebase.google.com/docs/crashlytics/get-started).

- #### Configuring the sample
	- Clone or download this repo and open the root directory.
	- You must have the Firebase CLI installed. If you don't have it, install it with `npm install -g firebase-tools` and then configure it with `firebase login`.
	- Configure the CLI locally by using `firebase use --add` and select your project in the list.
	- Install `npm` dependencies in the functions directory locally, by running: `cd functions; npm install;`
  
- #### Getting the zenduty API Key
	- Go to your Zenduty account, and in your service, add the Firebase Crashlytics integration
	- Copy the Integration URL
	- Config and set the environment variable for the access token and the GitHub repo (in which the new issues will be generated) by running this command: 
	`firebase functions:config:set zenduty.url="<paste-the-url-here>"`


## Deploy and test
- Deploy your project using `firebase deploy`
- Simulate a test crash. [Instructions](https://firebase.google.com/docs/crashlytics/force-a-crash)

