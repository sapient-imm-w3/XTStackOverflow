import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { setup } from "./service";


let config = {
    apiKey: "AIzaSyB27dZKtJ8xCD38hyNjtwfp5DCn14axl8s",
    authDomain: "sweetymedhu-9e71e.firebaseapp.com",
    databaseURL: "https://sweetymedhu-9e71e.firebaseio.com",
    projectId: "sweetymedhu-9e71e",
    storageBucket: "sweetymedhu-9e71e.appspot.com",
    messagingSenderId: "682645099129"
  };

firebase.initializeApp(config);


export const database = firebase.database();
export const auth = firebase.auth();

setup();