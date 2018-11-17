// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA1Xia725799awT7BTMZBVDQN0EW09VDRA',
    authDomain: 'osha-b65ae.firebaseapp.com',
    databaseURL: 'https://osha-b65ae.firebaseio.com',
    projectId: 'osha-b65ae',
    storageBucket: 'osha-b65ae.appspot.com',
    messagingSenderId: '536860153158'
  },
  base_url: 'http://localhost:8000'
};
