[![Build Status](https://travis-ci.com/l7960261/serverless-admin.svg?branch=master)](https://travis-ci.com/l7960261/serverless-admin) [![Dependency Status](https://david-dm.org/l7960261/serverless-admin.svg)](https://david-dm.org/l7960261/serverless-admin) [![devDependency Status](https://david-dm.org/l7960261/serverless-admin/dev-status.svg)](https://david-dm.org/l7960261/serverless-admin?type=dev)

# Serverless Admin

This project is admin and deploy to firebase


## How to use

Set src/environments/environment.ts

```
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
};
```