/******hide and show tablinks and for jQuery add link to html body*/
$(document).ready(function () {
  $("#myTab a").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

function show_user_info() {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user.uid);
    var firebaseRef = firebase.database().ref("users/" + user.uid);
    if (user) {
      user = firebase.auth().currentUser;
      firebaseRef.once("value", (snapshot) => {
        const userData = snapshot.val();
        console.log(userData);
        document.getElementById("user-name").innerHTML = userData.userFullName;
        document.getElementById("fullname-div").innerHTML =
          userData.userFullName;
        //document.getElementById("fullname").style.display = "none";

        document.getElementById("user_profile").innerHTML =
          userData.userFullName.charAt(0);

        document.getElementById("bio").innerHTML = userData.userBio;
        // document.getElementById("fb-url").innerHTML = userData.userFb;
        // document.getElementById("tw-url").innerHTML = userData.userTw;
        document.getElementById("email-div").innerHTML = userData.userEmail;
        document.getElementById("location").innerHTML = userData.userLocation;
        document.getElementById("address-div").innerHTML =
          userData.userLocation;
        document.getElementById("phone-div").innerHTML = userData.userPhone;
        document.getElementById("twitter").innerHTML = userData.userTw;
        document.getElementById("facebook").innerHTML = userData.userFb;
      });
    }
  });
}

show_user_info();

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
