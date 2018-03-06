const webpush = require('web-push');

const options = {
 vapidDetails: {
   subject: 'http://127.0.0.1:8080',
   publicKey: 'BMDZ6FANqsYRF9iGo3Ki0LdltGZZksgIFbgxBr_otO0H7jTFgcm3v2bGSgnVGJ5bidvLvuKStirfDNl4khVBiok',
   privateKey: 'tZacTzAIA5W-B19SsaQ-4KGWrKPAAqth5HQfJsjyHYs'
 },
 TTL: 5000
}

// NgPushRegistration-Object from the browser
const pushSubscription =  {"endpoint":"https://fcm.googleapis.com/fcm/send/dQn-7TOL3dM:APA91bHLuAR3G-XLxsSsjvo_P5UIEwrPS85Ho-fUZOFMpuuubEFgU6_dfgMZJvgvIOLCpSbRjPc_iWCdjgFz9snS3Rtg5H3H14RDeKt051CQp441PqqXrKHwR5ICpEyLV3x3jcEmGF8Q","expirationTime":null,"keys":{"p256dh":"BBq-RpOiUXSucWCUj8RrFy5jwKRZ6Rv9y7AHYqbE-0vIestbyRt8oxAC2yrbkwuKgPRYAElC32Sbs_Wo2mXNpJU=","auth":"sbIdhYisA6_Kc3_hDYJdog=="}};

const payload = JSON.stringify({
 notification: {
   title: 'Info',
   body: 'Hallo Welt!',
   icon: './assets/angular.png',
   data: 'additional data'
 }
});

webpush.sendNotification(
 pushSubscription,
 payload,
 options
);
