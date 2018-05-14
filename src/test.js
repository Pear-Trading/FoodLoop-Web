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
const pushSubscription =  {"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABanrgBKoC1etG5UeixhypVGQhGJoV5VtY72jIxx7rp0Bh3O4LZ4OmeYvGQgl0RxYD0ENNIzzMYTe0pgaynEOysvkyo4ybM6mHu_xFYrc9imf2F7lIuBCILCEjANG1gDoAWVRmBEMk0ZlYE4mq0KcoBjxwQDKTZsM4gITPmJdFxaCWRSls","keys":{"auth":"0uFlXtWtJH4arEGej3L_dQ","p256dh":"BMi13v5aFEgFgTwlSVDBv4uaxLOAdZ50U_-ITaP_-Brt6X3WN9gsl4G4oxhxTIj25zECdLARItXTJZ-Sof-O5bU"}};

const payload = JSON.stringify({
 notification: {
   title: '*TITLE*',
   body: '*BODY*',
 }
});

webpush.sendNotification(
 pushSubscription,
 payload,
 options
);
