import * as firebase from 'firebase';
import { register } from '../serviceWorker';
import Login from '../components/login';

// var config = {
//     apiKey: "AIzaSyBI2QVlaKmmAmAOd24ACJOjCaThsDhBuBo",
//     authDomain: "munshi-myfirstreact.firebaseapp.com",
//     databaseURL: "https://munshi-myfirstreact.firebaseio.com",
//     projectId: "munshi-myfirstreact",
//     storageBucket: "munshi-myfirstreact.appspot.com",
//     messagingSenderId: "1046837677340"
// };
var config = {
    apiKey: "AIzaSyCQ7s6wLxDOSbYLHZ4JYWfm6RlltRoFViY",
    authDomain: "saylani-8099b.firebaseapp.com",
    databaseURL: "https://saylani-8099b.firebaseio.com",
    projectId: "saylani-8099b",
    storageBucket: "saylani-8099b.appspot.com",
    messagingSenderId: "1028251352751"
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
    return new Promise((resolve, reject) => {
        console.log("Running LoginFB");
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (res) {
            alert("Login Successfull")
            getUser(res).then(function (ress) {
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

function addUser(res, fullname, age, email) {
    db.collection("users").doc(res.user.uid).set({ fullname, age, email }).then(function (user) {
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
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("", doc.id, " => ", doc.data())
                update(name, age, doc)
            })
        })
}
function update(fullname, age, doc) {
    db.collection('users').doc(doc.id).update({
        fullname,
        age
    }).then(function (user) {
        alert("user updated successfully")
    }).catch(function (err) {
        alert("Error updating user");
        alert(err.errorMessage)
    })
}

function signoutFB() {
    firebase.auth().signOut().then(function () {
        alert("You have been logged out")
    }).catch(function (err) {
        alert(err.errorMessage)
        // An error happened.
    });
}

function changePasswordFB(password) {
    var user = firebase.auth().currentUser;
    // confirmOldPassword(oldPassword);
    user.updatePassword(password).then(function () {
        alert("Password Changed Successfully")
    }).catch(function (err) {
        alert(err.errorMessage)
        // An error happened.
    });
}

function confirmOldPasswordFB(oldPassword) {
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        console.log(user.email);
        var email = user.email;
        var password = oldPassword;
        var credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            // User re-authenticated.
            alert("Password Verified")
            resolve(true)
        }).catch(function (err) {
            // An error happened.
            alert("Invalid Old Password provided")
            resolve(false)
        });
    })
}

function addImage(image) {
    return new Promise((resolve, reject) => {
        const lastDot = image.name.lastIndexOf('.');
        const filename = image.name.substring(0, lastDot) + '_' + Date.now() + image.name.substring(lastDot);
        var storageRef = firebase.storage().ref('expertizo/' + filename);

        storageRef.put(image).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve(downloadURL)
            })
        })
    })
}
async function addAd(title, description, price, images, category) {
    console.log(images)
    var imagesToDB = [];
    var length = images.length;
    for (var i = 0; i < length; i++) {
        var urladdImage = await addImage(images[i]);
        imagesToDB.push(urladdImage);
    }
    let obj = {
        title, description, price, images: imagesToDB, createdAt: Date.now(), category
    }
    obj.user = db.doc('users/' + firebase.auth().currentUser.uid);
    db.collection("ads").add(obj).then(function (user) {
        alert("Ad Added Successfully")
    });
}

function getCategories(){
    return new Promise((resolve, reject)=>{
        db.collection("categories").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                resolve(doc.data().categories)
            });
        });
    })
}

function getAds(){
    return new Promise((resolve, reject)=>{
        db.collection("ads").onSnapshot(function(querySnapshot) {
            var data = []
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                data.push(doc.data())
            });
            resolve(data);
        });
    })
}

function getAdsWithSearch(input){
    return new Promise((resolve, reject) => {
        console.log(input)
        const start = input;
        const end = start + "\uF8FF"
    
        db.collection('ads').orderBy('title')
        .startAt(start)
        .endAt(end)
        .get().then(doc => {
            console.log("DOC", doc)
            var data = []
            doc.forEach(res => {
                // doc.data() is never undefined for query doc snapshots
                console.log(res.id, " => ", res.data());
                data.push(res.data())
            });
            resolve(data);
        })
    })
}
function getAdsByCategory(input){
    return new Promise((resolve, reject) => {
        console.log(input)
        db.collection('ads')
        .where('category', '==' , input)
        .get().then(doc => {
            console.log("DOC", doc)
            var data = []
            doc.forEach(res => {
                // doc.data() is never undefined for query doc snapshots
                console.log(res.id, " => ", res.data());
                data.push(res.data())
            });
            resolve(data);
        })
    })
}
export {
    registerFB,
    loginFB,
    updateFB,
    signoutFB,
    changePasswordFB,
    confirmOldPasswordFB,
    addAd,
    getCategories,
    getAds,
    getAdsWithSearch,
    getAdsByCategory
}