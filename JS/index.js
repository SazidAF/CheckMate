const functions = require("firebase-functions");
function signUp() {
  //get user info
  var userFullName = document.getElementById("userFullName").value;
  var userEmail = document.getElementById("userEmail").value;
  var userPassword = document.getElementById("userPassword").value;
  var confirmPassword = document.getElementById("confirm-userPassword").value;

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://www.example.com/finishSignUp?cartId=1234",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "example.page.link",
  };

  firebase
    .auth()
    .sendSignInLinkToEmail(userEmail, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
      window.location.reload();
      // ...
    })
    .catch((error) => {
      // ...
    });

  var userFullNameFormate = /^([A-Za-z.\s_-])/;
  var userEmailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  var checkUserFullNameValid = userFullName.match(userFullNameFormate);
  var checkUserEmailValid = userEmail.match(userEmailFormate);
  var checkUserPasswordValid = userPassword.match(userPasswordFormate);
  var checkConfirmUserPasswordValid =
    userPassword == confirmPassword ? true : null;

  //*****sign up user*****
  if (checkUserFullNameValid == null) {
    return checkUserFullName();
  } else if (checkUserEmailValid == null) {
    return checkUserEmail();
  } else if (checkUserPasswordValid == null) {
    return checkUserPassword();
  } else if (checkConfirmUserPasswordValid == null) {
    return passwordValidation();
  } else {
    userPassword = md5(userPassword);
    console.log(userPassword);
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((cred) => {
        console.log(cred);
        var user = firebase.auth().currentUser;
        console.log(user);
        var uid;
        if (user != null) {
          uid = user.uid;
        }
        var firebaseRef = firebase.database().ref("users/");
        var userData = {
          userUid: uid,
          userFullName: userFullName,
          userEmail: userEmail,
          userPassword: userPassword,
          userFb: "https://www.facebook.com/",
          userTw: "https://twitter.com/",
          userBio: "User biography",
        };
        firebaseRef.child(uid).set(userData);
        swal(
          "Your Account Created",
          "Your account was created successfully, you can log in now.",
          "success"
        ).then((value) => {
          setTimeout(function () {
            window.location.replace("/HTML/profile.html");
          }, 1000);
        });
      })
      .catch((error) => {
        //Handle errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(errorCode, errorMessage, "warning");
      });
  }
}

// ******* Full Name Validation ********
function checkUserFullName() {
  var username = document.getElementById("userFullName").value;
  var flag = false;
  if (username === "") {
    flag = true;
  }
  if (flag) {
    document.getElementById("userFullNameError").style.display = "block";
    document
      .getElementById("userFullNameError")
      .setAttribute("class", "text-danger");
  } else {
    document.getElementById("userFullNameError").style.display = "none";
  }
}

// ****** Email Validation ******
function checkUserEmail() {
  var userEmail = document.getElementById("userEmail");
  var userEmailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if (userEmail.value.match(userEmailFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userEmailError").style.display = "block";
    document
      .getElementById("userEmailError")
      .setAttribute("class", "text-danger");
  } else {
    document.getElementById("userEmailError").style.display = "none";
  }
}

// ****** Password Validation ******
function checkUserPassword() {
  var userPassword = document.getElementById("userPassword");
  var userPasswordFormate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  var flag;
  if (userPassword.value.match(userPasswordFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userPasswordError").style.display = "block";
    document
      .getElementById("userPasswordError")
      .setAttribute("class", "text-danger");
  } else {
    document.getElementById("userPasswordError").style.display = "none";
  }
}
// ******Confirm Password Validation ******
function passwordValidation() {
  var userPassword = document.getElementById("userPassword");
  var confirmPassword = document.getElementById("confirm-userPassword");
  var flag;
  if (userPassword.value == confirmPassword.value) {
    flag = false;
  } else {
    flag = true;
  }

  if (flag) {
    document
      .getElementById("confirm-userPasswordError")
      .setAttribute("class", "text-danger");
    document.getElementById("confirm-userPasswordError").innerHTML =
      "Confirm Password do not match";
  }
}

// ****** Submitting and Creating new user in firebase authentication ******
function signIn() {
  //get user info
  var userSIEmail = document.getElementById("userSIEmail").value;
  var userSIPassword = document.getElementById("userSIPassword").value;

  //sign in user
  if (userSIEmail == "") {
    return checkUserSIEmail();
  } else if (userSIPassword == "") {
    return checkUserSIPassword();
  } else {
    userSIPassword = md5(userSIPassword);
    console.log(userSIPassword);
    firebase
      .auth()
      .signInWithEmailAndPassword(userSIEmail, userSIPassword)
      .then((cred) => {
        swal("Successful", "Successfully signed in", "success").then(
          (value) => {
            setTimeout(function () {
              window.location.replace("/HTML/home.html");
            }, 1000);
          }
        );
      })
      .catch((error) => {
        //Handle errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(errorCode, errorMessage, "warning");
      });
  }
}

// ****** Sign In Email Validation ******
function checkUserSIEmail() {
  var userSIEmail = document.getElementById("userSIEmail");
  var userSIEmailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if (userSIEmail.value.match(userSIEmailFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userSIEmailError").style.display = "block";
    document
      .getElementById("userSIEmailError")
      .setAttribute("class", "text-danger");
  } else {
    document.getElementById("userSIEmailError").style.display = "none";
  }
}

// ***** Sign In Password Validation ******
function checkUserSIPassword() {
  var userSIPassword = document.getElementById("userSIPassword");
  var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  var flag;
  if (userSIPassword.value.match(userSIPasswordFormate)) {
    flag = false;
  } else {
    flag = true;
  }
  if (flag) {
    document.getElementById("userSIPasswordError").style.display = "block";
    document
      .getElementById("userSIPasswordError")
      .setAttribute("class", "text-danger");
  } else {
    document.getElementById("userSIPasswordError").style.display = "none";
  }
}

// ****** Show edit profile form with detail ******
function showEditProfileForm() {
  document.getElementById("profileSection").style.display = "none";
  document.getElementById("editProfileForm").style.display = "block";
  var userPfFullName = document.getElementById("userPfFullName").innerHTML;
  var userPfFb = document.getElementById("userPfFb").getAttribute("href");
  var userPfTw = document.getElementById("userPfTw").getAttribute("href");
  var userPfLocation = document.getElementById("userLocation").innerHTML;
  var userPfPhone = document.getElementById("userNumber").innerHTML;
  var userPfBio = document.getElementById("userPfBio").innerHTML;

  document.getElementById("userFullName").value = userPfFullName;
  document.getElementById("userFacebook").value = userPfFb;
  document.getElementById("userTwitter").value = userPfTw;
  document.getElementById("userLocation").value = userPfLocation;
  document.getElementById("userNumber").value = userPfPhone;
  document.getElementById("userBio").value = userPfBio;
}

// ****** Hide edit profile form ******
function hideEditProfileForm() {
  document.getElementById("profileSection").style.display = "block";
  document.getElementById("editProfileForm").style.display = "none";
}

/****** Save profile and update database ********/
function saveProfile() {
  let userFullName = document.getElementById("userFullName").value;
  let userFacebook = document.getElementById("userFacebook").value;
  let userTwitter = document.getElementById("userTwitter").value;
  let userLocation = document.getElementById("userLocation").value;
  let userPhone = document.getElementById("userNumber").value;
  let userBio = document.getElementById("userBio").value;

  if (userFullName == "") {
    return checkUserFullName();
  } else {
    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
      uid = user.uid;
    }
    var firebaseRef = firebase.database().ref("users/");
    var userData = {
      userUid: uid,
      userFullName: userFullName,
      userFb: userFacebook,
      userTw: userTwitter,
      userLocation: userLocation,
      userPhone: userPhone,
      userBio: userBio,
    };
    firebaseRef.child(uid).update(userData);
    swal("Update Successfully", "Profile Updated", "success").then((value) => {
      setTimeout(function () {
        // document.getElementById("profileSection").style.display = "block";
        // document.getElementById("editProfileForm").style.display = "none";
        window.location.replace("/HTML/home.html");
      }, 1000);
    });
  }
}

//****Listen for auth status changes****
firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (user) {
    // User is signed in.
    console.log("user signed in");
    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
      uid = user.uid;
    }
    let firebaseRefKey = firebase.database().ref("users/").child(uid);
    firebaseRefKey.on("value", (dataSnapShot) => {
      document.getElementById("userPfFullName").innerHTML =
        dataSnapShot.val().userFullName;
      document
        .getElementById("userPfFb")
        .setAttribute("href", dataSnapShot.val().userFb);
      document
        .getElementById("userPfTw")
        .setAttribute("href", dataSnapShot.val().userTw);
      document
        .getElementById("userPfBio")
        .setAttribute("href", dataSnapShot.val().userBio);
    });
  } else {
    console.log("not signed in");
    // No user is signed in.
  }
});

/****** Working For Sign Out ******/
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      swal("Signed Out!", "You are signed out").then((value) => {
        setTimeout(function () {
          window.location.replace("/HTML/signin.html");
        }, 1000);
      });
      //console.log("user signed out");
    })
    .catch((error) => {
      //An error happened.
      var errorMessage = error.message;
      swal(errorMessage, "warning");
    });
}
