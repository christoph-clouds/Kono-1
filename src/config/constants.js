import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCTPR4QJafHhrhZSlEE4z_Wkq7aCpHYTl4",
	authDomain: "kono-eb560.firebaseapp.com",
	databaseURL: "https://kono-eb560.firebaseio.com",
	projectId: "kono-eb560",
	storageBucket: "",
	messagingSenderId: "163431774499"
}
export const firebaseApp = firebase.initializeApp(config)
export const ref = firebase.database().ref('events')
export const provider = new firebase.auth.GoogleAuthProvider();