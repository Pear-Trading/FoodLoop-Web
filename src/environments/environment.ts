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
		apiKey: 'CHANGEME',
		authDomain: 'CHANGEME.firebaseapp.com',
		databaseURL: 'CHANGEME.firebaseio.com',
		projectId: 'CHANGEME',
		storageBucket: 'CHANGEME.appspot.com',
		messagingSenderId: 'CHANGEME',
		appId: 'CHANGEME',
		measurementId: 'G-CHANGEME'
	}
};
