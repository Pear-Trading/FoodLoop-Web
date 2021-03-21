// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://CHANGEME/api',
  mapApiKey: 'CHANGEME',
  enableAnalytics: false,
  analyticsKey: 'CHANGEME',
  firebase: {
		apiKey: "AIzaSyB-iIcMH_eyfFT043_8pSGX3YYugpjm3Fg",
		authDomain: "localspend-47012.firebaseapp.com",
		databaseURL: "https://localspend-47012.firebaseio.com",
		projectId: "localspend-47012",
		storageBucket: "localspend-47012.appspot.com",
		messagingSenderId: "469562689216",
		appId: "1:469562689216:web:567a20c57c123f17354f25",
		measurementId: "G-KL7BGT2EW0"
	}
};
