// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyB3oQLY1h0z4SjJXUatEg_7iy-MwV52Dno",
    authDomain: "authsample-dc128.firebaseapp.com",
    databaseURL: "https://authsample-dc128.firebaseio.com",
    projectId: "authsample-dc128",
    storageBucket: "authsample-dc128.appspot.com",
    messagingSenderId: "180034420521"
  }
};
