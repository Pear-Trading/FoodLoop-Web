import { environment } from "./environments/environment";

importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: environment.firebase.apiKey, 
  authDomain: environment.firebase.authDomain,
  databaseURL: environment.firebase.databaseURL,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
  measurementId: environment.firebase.measurementId  
});

const messaging = firebase.messaging();
