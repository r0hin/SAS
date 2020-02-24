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
        document.getElementById('signed').style.display = 'block'
        document.getElementById('unsigned').style.display = 'none'
    } else {
        document.getElementById('unsigned').style.display = 'block'
        document.getElementById('signed').style.display = 'none'
    }
});

function signin() {

    var provider = new firebase.auth.GoogleAuthProvider();


    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;

        // ...
    }).catch(function (error) {
        error(error.message)
    });

}

var ctx = document.getElementById('myChart').getContext('2d');
gradient = ctx.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Jan 23', 'Feb 12', 'March 4', 'April 9', 'April 12',],
        datasets: [{
            label: 'something over time',
            backgroundColor: gradient,
            borderColor: '#ffdbef',
            data: [0, 10, 5, 2, 20]
        }]
    },

    // Configuration options go here
    options: {}
})


