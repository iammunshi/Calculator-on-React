import * as firebase from 'firebase';
import { register } from '../serviceWorker';
import Login from '../components/login';

var config = {
    apiKey: "AIzaSyBI2QVlaKmmAmAOd24ACJOjCaThsDhBuBo",
    authDomain: "munshi-myfirstreact.firebaseapp.com",
    databaseURL: "https://munshi-myfirstreact.firebaseio.com",
    projectId: "munshi-myfirstreact",
    storageBucket: "munshi-myfirstreact.appspot.com",
    messagingSenderId: "1046837677340"
};
firebase.initializeApp(config);
const db = firebase.firestore();


function registerFB(name, age, email, password) {
    console.log("Running registerFB")
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (res) {
            addUser(res, name, age, email)
            alert('Registered Successful');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
}

function loginFB(email, password) {
    return new Promise((resolve,reject) => {
        console.log("Running LoginFB");
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (res) {
            alert("Login Successfull")
            getUser(res).then(function(ress){
                resolve(ress)
            })
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
    })

}

function addUser(res, name, age, email) {
    db.collection("users").doc(res.user.uid).set({ name, age, email }).then(function (user) {
        alert("User Added Successfully")
    });
}

function getUser(res) {
    return new Promise((resolve, reject) => {
        console.log("Into get user")
        console.log(res.user.uid)
        var docRef = db.collection("users").doc(res.user.uid);
        console.log("docref", docRef);
        docRef.get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log("User==>", doc.data());
                    resolve(doc.data())
                } else {
                    console.log("No such Data")
                }
            })
            .catch(function (error) {
                console.log("Error Getting Doc", error)
            })
    })
}
function updateFB(name, age, email) {
    db.collection('users').where('email', '==', email)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log("", doc.id, " => ", doc.data())
            update(name, age, doc)
        })
    })
}
function update(name, age, doc){
    db.collection('users').doc(doc.id).update({
        name,
        age
    }).then(function(user){
        alert("user updated successfully")
    }).catch(function(err){
        alert("Error updating user")
    })
}
export {
    registerFB,
    loginFB,
    updateFB
}