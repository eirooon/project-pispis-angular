// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyA0EJnToojyX3NTCiQFCAzXZVQ5d2v8mZc",
    authDomain: "project-pispis.firebaseapp.com",
    databaseURL: "https://project-pispis.firebaseio.com",
    projectId: "project-pispis",
    storageBucket: "project-pispis.appspot.com",
    messagingSenderId: "538589836499"
  }
};
