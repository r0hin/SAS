
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
            window.location.replace('index.html?v=a')
        }
    } else {
        window.location.replace('index.html')
    }
});


function setup() {
    loadsets()
    document.getElementById('signed').style.display = 'block'
}


function createset() {

    name = document.getElementById('set1').value
    notes = document.getElementById('set2').value
    rest = document.getElementById('set3').value
    sets = document.getElementById('set4').value
    reps = document.getElementById('set5').value
    rir = document.getElementById('set6').value
    day = document.getElementById('set7').value

    db.collection('sets').add({
        name: name,
        notes: notes,
        rest: rest,
        sets: sets,
        reps: reps,
        rir: rir,
        day: day
    }).then(function () {
        Snackbar.show({ text: 'Set created.' })
        refresh()
    })


}

function refresh() {
    $('#sets').empty()
    loadsets()
}

function prepareedit(id) {

    document.getElementById('editbutton').onclick = function () {
        edit(id)
    }

    db.collection('sets').doc(id).get().then(function (doc) {
        document.getElementById('newset1').value = doc.data().name
        document.getElementById('newset2').value = doc.data().notes
        document.getElementById('newset3').value = doc.data().rest
        document.getElementById('newset4').value = doc.data().sets
        document.getElementById('newset5').value = doc.data().reps
        document.getElementById('newset6').value = doc.data().rir
        document.getElementById('newset7').value = doc.data().day
    })

    $('#editmodal').modal('toggle')



}

function edit(id) {

    db.collection('sets').doc(id).update({
        name: document.getElementById('newset1').value,
        notes: document.getElementById('newset2').value,
        rest: document.getElementById('newset3').value,
        sets: document.getElementById('newset4').value,
        reps: document.getElementById('newset5').value,
        rir: document.getElementById('newset6').value,
        day: document.getElementById('newset7').value,
    }).then(function () {
        Snackbar.show({ text: 'Updated workout.' });
        refresh()
    })

}

function deletething(id) {

    x = confirm('Are you sure you want to delete the workout with the ID: ' + id)

    if (x) {
        db.collection('sets').doc(id).delete().then(function () {
            Snackbar.show({ text: 'Workout deleted.' });
            refresh()
        })
    }
    else {

    }



}


function loadsets() {

    db.collection('sets').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {


            b = document.createElement('div')
            b.classList.add('card')
            b.style.display = 'inline-block'
            b.style.textAlign = 'left'
            b.style.width = '80%'
            editFunc = "prepareedit('" + doc.id + "')"
            deleteFunc = "deletething('" + doc.id + "')"
            b.innerHTML = '<div class="card-body"><h3>' + doc.data().name + '</h3><h5>Notes: ' + doc.data().notes + '</h5><h5>Reps: ' + doc.data().reps + '</h5><h5>Rest: ' + doc.data().rest + '</h5><h5>RIR: ' + doc.data().rir + '</h5><h5>Sets: ' + doc.data().sets + '</h5><center><button onclick="' + editFunc + '" class="eon-contained">edit</button><button onclick="' + deleteFunc + '" class="eon-contained">delete</button></center></div>'

            if ($('#' + doc.data().day).length > 0) {

                document.getElementById('content' + doc.data().day).appendChild(b)

            } else {

                a = document.createElement('div')
                a.id = doc.data().day
                a.innerHTML = '<div class="card" style="width: 80%; padding: 12px;"><div id="content' + doc.data().day + '" class="card-body"><h3>Day ' + doc.data().day + '</h3></div></div><br><br>'

                document.getElementById('sets').appendChild(a)


                document.getElementById('content' + doc.data().day).appendChild(b)

                doSort()

            }

        })
    })

}

function doSort() {
    var main = document.getElementById('sets');

    [].map.call(main.children, Object).sort(function (a, b) {
        return +a.id.match(/\d+/) - +b.id.match(/\d+/);
    }).forEach(function (elem) {
        main.appendChild(elem);
    });
}

