// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  mapApiKey: 'AIzaSyBhm0iaIGG0Ko5IsfZx-CpLt01YHkp4Y1w',
  config: {
    "VAPID_PUBLIC_KEY": "BMDZ6FANqsYRF9iGo3Ki0LdltGZZksgIFbgxBr_otO0H7jTFgcm3v2bGSgnVGJ5bidvLvuKStirfDNl4khVBiok"
  },
  enableAnalytics: false,
  analyticsKey: ''
};
