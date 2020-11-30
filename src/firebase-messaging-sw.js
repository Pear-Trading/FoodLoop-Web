importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyB-iIcMH_eyfFT043_8pSGX3YYugpjm3Fg",
  authDomain: "localspend-47012.firebaseapp.com",
  databaseURL: "https://localspend-47012.firebaseio.com",
  projectId: "localspend-47012",
  storageBucket: "localspend-47012.appspot.com",
  messagingSenderId: "469562689216",
  appId: "1:469562689216:web:43378a652e829fed354f25",
  measurementId: "G-8NMVL6RL8C"  
});

const messaging = firebase.messaging();
