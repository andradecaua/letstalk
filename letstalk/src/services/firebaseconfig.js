import firebase from  'firebase/compat/app'
import "firebase/compat/database"
import "firebase/compat/auth"



const firebaseConfig = { // Configuração da api do firebase
    apiKey: "AIzaSyDhRmaHRfggNxpjSnPfA7OMsczoVMpLd7k",
    authDomain: "talk-me-hybri.firebaseapp.com",
    databaseURL: "https://talk-me-hybri-default-rtdb.firebaseio.com",
    projectId: "talk-me-hybri",
    storageBucket: "talk-me-hybri.appspot.com",
    messagingSenderId: "1055537248156",
    appId: "1:1055537248156:web:3c17afe48fb55f1b63fa59"
}

firebase.initializeApp(firebaseConfig) // Inicializando o firebase

const database = firebase.database() // Realtime database
const auth = firebase.auth() //Autenticação

export {auth, database}