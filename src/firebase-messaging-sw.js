/**
 * A Web Worker for sending and receiving messages using the Firebase Cloud
 * Messaging (FCM) service.
 */

importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyB-iIcMH_eyfFT043_8pSGX3YYugpjm3Fg",
	authDomain: "localspend-47012.firebaseapp.com",
	databaseURL: "https://localspend-47012.firebaseio.com",
	projectId: "localspend-47012",
	storageBucket: "localspend-47012.appspot.com",
	messagingSenderId: "469562689216",
	appId: "1:469562689216:web:567a20c57c123f17354f25",
	measurementId: "G-KL7BGT2EW0"
});

const messaging = firebase.messaging();
