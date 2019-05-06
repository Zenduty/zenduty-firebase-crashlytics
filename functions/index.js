'use strict';

const functions = require('firebase-functions');
const rp = require('request-promise');

// Helper function that posts to Slack about the new issue
const createIssue = (issueTitle, issueMessage, issue, issue_url) => {
  // See https://developer.github.com/v3/issues/#create-an-issue on how
  // to customize the message payload
  var issueReq = rp({
    method: 'POST',
    uri: functions.config().zenduty.url,
    qs: {
      access_token: 'fsdfsdfdfdfdsf' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    body: {
      title: issueTitle,
      body: issueMessage,
      issue: issue,
      issue_url: issue_url,
      labels: [

      ]
    },
    headers: {
      "User-Agent": "Firebase-Cloud-Functions",
      "Content-Type": "application/json"
    },
    json: true,
  });

  console.log(issueReq);
  return issueReq;
};

exports.postOnNewIssue = functions.crashlytics.issue().onNew((issue) => {

  var issueId = issue.issueId;
  var issueTitle = issue.issueTitle;
  var issue_url = `https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId}`

  var appId = issue.appInfo ? issue.appInfo.appId : "";
  var appName = issue.appInfo ? issue.appInfo.appName : "";
  var appPlatform = issue.appInfo ? issue.appInfo.appPlatform : "";
  var latestAppVersion = issue.appInfo ? issue.appInfo.latestAppVersion : "";

  // Prepare the issue text.
  var title = `${issueTitle} (${issueId})`;
  var message = `
  
  Crash report : [Firebase Console Link](https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId})
  
  Application Info:\n
  Application name: ${appName}(${appId}) 
  Version: ${latestAppVersion} on ${appPlatform}`;

  return createIssue(title, message, issue, issue_url).then(() => {
    return console.log(`Posted new issue ${issueId} successfully to Zenduty`);
  });
});

exports.sendOnRegressedIssue = functions.crashlytics.issue().onRegressed((issue) => {
  var issueId = issue.issueId;
  var issueTitle = issue.issueTitle;

  var appId = issue.appInfo ? issue.appInfo.appId : "";
  var appName = issue.appInfo ? issue.appInfo.appName : "";
  var appPlatform = issue.appInfo ? issue.appInfo.appPlatform : "";
  var latestAppVersion = issue.appInfo ? issue.appInfo.latestAppVersion : "";

  // Prepare the issue text.
  var title = `${issueTitle} (${issueId})`;
  var issue_url = `https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId}`

  var message = `

  
  Crash report : [Firebase Console Link](https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId})
  
  Application Info:\n
  Application name: ${appName}(${appId}) 
  Version: ${latestAppVersion} on ${appPlatform}`;


  return createIssue(title, message, issue, issue_url).then(() => {
    return console.log(`Posted new issue ${issueId} successfully to Zenduty`);
  });


});

exports.sendOnVelocityAlert = functions.crashlytics.issue().onVelocityAlert((issue) => {
  var issueId = issue.issueId;
  var issueTitle = issue.issueTitle;

  var appId = issue.appInfo ? issue.appInfo.appId : "";
  var appName = issue.appInfo ? issue.appInfo.appName : "";
  var appPlatform = issue.appInfo ? issue.appInfo.appPlatform : "";
  var latestAppVersion = issue.appInfo ? issue.appInfo.latestAppVersion : "";
  var issue_url = `https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId}`

  // Prepare the issue text.
  var title = `${issueTitle} (${issueId})`;
  var message = `
  
  Crash report : [Firebase Console Link](https://console.firebase.google.com/u/0/project/${process.env.GCLOUD_PROJECT}/crashlytics/app/${appPlatform}:${appId}/issues/${issueId})
  
  Application Info:\n
  Application name: ${appName}(${appId}) 
  Version: ${latestAppVersion} on ${appPlatform}`;


  return createIssue(title, message, issue, issue_url).then(() => {
    return console.log(`Posted new issue ${issueId} successfully to Zenduty`);

  });


});