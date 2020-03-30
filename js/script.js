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

        if (user.email == 'rohin.arya@ucc.eon.ca') {

            Snackbar.show({
                text: 'Admin account detected. Go to teacher panel?',
                actionText: 'Go',
                onActionClick: function (element) {
                    $(element).css('opacity', 0); transfer('admin.html')
                }
            })
        }

        document.getElementById('signed').style.display = 'block'
        document.getElementById('unsigned').style.display = 'none'

        document.getElementById('username1').innerHTML = user.displayName
        document.getElementById('useremail1').innerHTML = user.email
        document.getElementById('pfp1').src = user.photoURL

        $('#workouts').empty()
        loadstuff()

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
        $('#errorModal').modal('toggle')
        document.getElementById('erorrModalMsg').innerHTML = error
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



function signout() {
    Snackbar.show({ text: 'Signing out...' })
    window.setTimeout(function () {
        firebase.auth().signOut().then(function () {
            Snackbar.show({ text: 'Signed out.' })
        }).catch(function (error) {
            Snackbar.show({ text: 'Error signing out: ' + error })
        });
    }, 2500)
}

function openworkout(id) {
    $('#workoutmodal').modal('toggle')

    db.collection('sets').doc(id).get().then(function (doc) {

        document.getElementById('workoutname').innerHTML = doc.data().name
        document.getElementById('workoutdescription').innerHTML = doc.data().notes
        document.getElementById('reps').innerHTML = doc.data().reps
        document.getElementById('sets').innerHTML = doc.data().sets
        document.getElementById('rest').innerHTML = doc.data().sets


    })
}

function loadstuff() {

    db.collection('sets').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {


            b = document.createElement('div')
            b.classList.add('grid-item')
            workoutfunc = "openworkout('" + doc.id + "')"
            b.innerHTML = '<button onclick="' + workoutfunc + '" class="eon-outlined">' + doc.data().name + '</button>'

            if ($('#' + doc.data().day).length > 0) {

                document.getElementById('content' + doc.data().day).appendChild(b)

            } else {

                a = document.createElement('div')
                a.id = doc.data().day
                a.innerHTML = '<div class="card"><center><h3>Day ' + doc.data().day + '</h3></center>     <div style="width: 90%; border: 1px solid rgb(133, 133, 133);" id="content' + doc.data().day + '" class="grid-container">     </div> <br></div><br><br>'

                document.getElementById('workouts').appendChild(a)


                document.getElementById('content' + doc.data().day).appendChild(b)

                doSort()

            }

        })
    })

}

function doSort() {
    var main = document.getElementById('workouts');

    [].map.call(main.children, Object).sort(function (a, b) {
        return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
        main.appendChild(elem);
    });
}

/*<div class="card">
  <center><h3>Day 1</h3></center>
    <div style="width: 90%; border: 1px solid rgb(133, 133, 133);" class="grid-container">
    </div>
<br>
  </div>*/

/*<div class="card">
  <center><h3>Day 1</h3></center>
    <div style="width: 90%; border: 1px solid rgb(133, 133, 133);" class="grid-container">
      <div class="grid-item">
        <button class="eon-outlined">Name of workout</button>
      </div>
    </div>
<br>
  </div>*/

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('v')

if (myParam == 'a') {
    Snackbar.show({
        text: 'No access. More > Report a bug if you think its an error'
    })
    window.history.pushState(null, null, 'index.html')
}