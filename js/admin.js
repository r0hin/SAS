// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBQkNbhM7YZhge0QTLt6jCNGBy6vF6cpnQ",
    authDomain: "sas-web-app-b3dff.firebaseapp.com",
    databaseURL: "https://sas-web-app-b3dff.firebaseio.com",
    projectId: "sas-web-app-b3dff",
    storageBucket: "sas-web-app-b3dff.appspot.com",
    messagingSenderId: "631176255412",
    appId: "1:631176255412:web:73a18eddfeeb0a888604e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


db = firebase.firestore()

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        if (user.email == 'rohin.arya@ucc.on.ca') {
            setup()
        }
        else {
            window.location.replace('index.html')
        }
    } else {
        window.location.replace('index.html')
    }
});


function setup() {
    console.log('aok');
    document.getElementById('signed').style.display = 'block'
}

$('#setmodal').modal('toggle')

function createset() {

}