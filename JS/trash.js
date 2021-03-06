// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBzFIsDwS53ueZZ9X79V06CvATUbde5XyI",
  authDomain: "checkmate-b5734.firebaseapp.com",
  projectId: "checkmate-b5734",
  storageBucket: "checkmate-b5734.appspot.com",
  messagingSenderId: "778401257741",
  appId: "1:778401257741:web:4bbd814828867fc012f844",
  measurementId: "G-HQ64910E4B",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var taskArray = [];

function showAllTrash() {
  show_task_container = document.getElementsByClassName("row")[0];
  show_task_container.innerHTML = "";
  firebase.auth().onAuthStateChanged(function (user) {
    var firebaseRef = firebase.database().ref("users/" + user.uid + "/Trash/"); // need for all task
    if (user) {
      user = firebase.auth().currentUser;
      // Retrieve new tasks as they are added to our database
      firebaseRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childkey = childSnapshot.key;
          var date_given = new Date(childSnapshot.val().date);

          taskArray.push(childSnapshot.val());
        });
        for (var i, i = 0; i < taskArray.length; i++) {
          task_date = taskArray[i].date;
          task_key = taskArray[i].key;
          task_title = taskArray[i].title;
          task_description = taskArray[i].description;
          task_time = taskArray[i].time;
          console.log(task_title);

          //var date_given_month = new Date(task_date);

          // task_list = document.createElement("li");

          // task_container = document.createElement("div");
          // task_container.setAttribute("class", "task_container");
          // task_container.setAttribute("data-key", task_key);
          // task_container.setAttribute("user-uid", user.uid);

          // TASK DATA
          card_box = document.createElement("div");
          card_box.setAttribute("class", "col-lg-4");

          card_margin = document.createElement("div");
          card_margin.setAttribute("class", "card card-margin");

          card_margin.id = "cardId" + task_key;

          card_margin.setAttribute("title", task_title);
          card_margin.setAttribute("Tdate", task_date);
          card_margin.setAttribute("Ttime", task_time);
          card_margin.setAttribute("Tdescription", task_description);

          card_body = document.createElement("div");
          card_body.setAttribute("class", "card-body pt-0");

          main_text = document.createElement("div");
          main_text.setAttribute("class", "widget-49");

          title_wrapper = document.createElement("div");
          title_wrapper.setAttribute("class", "widget-49-title-wrapper");

          title_info = document.createElement("div");
          title_info.setAttribute("class", "widget-49-meeting-info");

          add_title = document.createElement("span");
          add_title.setAttribute("class", "widget-49-pro-title");
          add_title = create_title(task_title);

          add_title.setAttribute("data-key", task_key);
          add_title.setAttribute("user-uid", user.uid);

          title_time = document.createElement("span");
          title_time.setAttribute("class", "widget-49-meeting-time");

          title_time.innerHTML = task_time;

          date = document.createElement("div");
          date.setAttribute("class", "widget-49-date-primary");
          //date.setAttribute("contenteditable", false);

          date_day = document.createElement("span");
          date_day.setAttribute("class", "widget-49-date-day");

          date_month = document.createElement("span");
          date_month.setAttribute("class", "widget-49-date-month");

          var date_given_month = new Date(task_date);
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          date_month.innerHTML = months[date_given_month.getMonth()];
          date_day.innerHTML = date_given_month.getDate();
          console.log(date_given_month.getDate());

          task_tool = document.createElement("div");
          task_tool.setAttribute("class", "dropdown-container");
          task_tool.setAttribute("tabindex", "-2");

          three_dot_unarchive = document.createElement("button");

          three_dot_unarchive.setAttribute("class", "btn btn-primary btn-sm ml-2");

          three_dot_unarchive_icon = document.createElement("i");
          three_dot_unarchive_icon.setAttribute(
            "class",
            "bi bi-arrow-counterclockwise"
          );
          three_dot_unarchive.setAttribute(
            "onclick",
            "task_restore(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, 'finished_task')"
            );

          three_dot_delete = document.createElement("button");
          three_dot_delete.setAttribute("class", "btn btn-outline-danger btn-sm ml-2");
          three_dot_delete.setAttribute("data-toggle", "modal");
          three_dot_delete.setAttribute("data-target", "delete-modal");
          //three_dot_delete.innerHTML = "delete";
          

          three_dot_delete_icon = document.createElement("i");
          three_dot_delete_icon.setAttribute("class", "bi bi-trash");

          three_dot_delete.setAttribute(
              "onclick",
              "open_del_modal(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, 'finished_task')"
           );

          // three_dot_delete.setAttribute(
          //   "onclick",
          //   "task_delete(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, 'finished_task')"
          // );

          description_div = document.createElement("div");
          description_div.setAttribute("class", "widget-49-meeting-item");

          description = document.createElement("span");
          description.setAttribute("class", "widget-49-meeting-item span");
          description.innerHTML = task_description;

          show_task_container.append(card_box);
          card_box.append(card_margin);
          card_margin.append(card_body);
          card_body.append(main_text);
          main_text.append(title_wrapper);
          title_wrapper.append(date);
          date.append(date_day);
          date.append(date_month);
          main_text.append(title_info);
          title_info.append(add_title);
          title_info.append(title_time);
          title_wrapper.append(task_tool);
          task_tool.append(three_dot_unarchive);
          task_tool.append(three_dot_delete);

          three_dot_unarchive.append(three_dot_unarchive_icon);

          three_dot_delete.append(three_dot_delete_icon);

          main_text.append(description_div);
          description_div.append(description);
        }
      });
    }
  });
}

function open_del_modal(task_parentDiv, tasktype){
  console.log("yes");
  document.getElementById("delete-modal").style= "display:block";
  task =
    task_parentDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
      .childNodes[0];

  console.log(task);
  document.getElementById("delforever").addEventListener("click", function() {
    
  var key = task.getAttribute("data-key");
  var user_uid = task.getAttribute("user-uid");
  trash = firebase.database().ref("users/" + user_uid + "/Trash/" + key);
  trash.remove();
  task_parentDiv.remove();
  });
}

function create_title(task_title) {
  title = document.createElement("span");
  title.setAttribute("id", "task_title");
  title.setAttribute("contenteditable", false);
  title.innerHTML = task_title;
  return title;
}

// function task_delete(task_parentDiv, tasktype) {
//   console.log(task_parentDiv);
//   task =
//     task_parentDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
//       .childNodes[0];

//   console.log(task);

//   var key = task.getAttribute("data-key");
//   var user_uid = task.getAttribute("user-uid");

//   trash = firebase.database().ref("users/" + user_uid + "/Trash/" + key);


//   trash.remove();

//   task_parentDiv.remove();
// }

/*** remove from html view or whateversss *****/
function task_delete_card(task_parentDiv) {
  console.log(task_parentDiv);
  task_parentDiv.remove();
}

/*** copy to Trash in Firebase *****/
function copyTask(oldRef, newRef) {
  oldRef
    .once("value")
    .then((snap) => {
      return newRef.set(snap.val());
    })
    .then(() => {
      oldRef.set(null);
      console.log("Delete Done!");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function task_restore(task_parentDiv) {
  console.log(task_parentDiv);
  task =
    task_parentDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
      .childNodes[0];

  var key = task.getAttribute("data-key");

    var user_uid = task.getAttribute("user-uid");

  task_to_restore = firebase
    .database()
    .ref("users/" + user_uid + "/unfinished_task/" + key);

  trash = firebase.database().ref("users/" + user_uid + "/Trash/" + key);

  copyTask(trash, task_to_restore);

  task_parentDiv.remove();
}


function closeTrashModal(){
 
  document.getElementById("delete-modal").style = "display: none";

}


/** tasklist js */

var taskArrayTitle = [];
var taskID = [];

firebase.auth().onAuthStateChanged(function (user) {
  var firebaseRef = firebase
    .database()
    .ref("users/" + user.uid + "/Trash/")
    .orderByChild("time"); // need for all task
  if (user) {
    user = firebase.auth().currentUser;
    // Retrieve new tasks as they are added to our database
    firebaseRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childkey = childSnapshot.key;

        taskArrayTitle.push(childSnapshot.val().title);
        taskID.push(childkey);
      });
    });
  }
});
/** Searchbar Js */
// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const SearchinputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
// const searchicon = searchWrapper.querySelector(".searchicon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
SearchinputBox.onkeyup = (e) => {
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if (userData) {
    // searchicon.onclick = () => {
    //   webLink = `https://www.google.com/search?q=${userData}`;
    //   linkTag.setAttribute("href", webLink);
    //   linkTag.click();
    // };
    emptyArray = taskArrayTitle.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data
        ?.toLocaleLowerCase()
        .startsWith(userData?.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return (data = `<a><li>${data}</li></a>`);
    });
    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);
    let allList = suggBox.querySelectorAll("a");
    let allString = suggBox.querySelectorAll("li");

    function hrefAdder(TitleString) {
      for (let i = 0; i < taskArrayTitle.length; i++) {
        if (TitleString == taskArrayTitle[i]) {
          // console.log(i);
          return i;
        }
      }
    }

    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      taskTitleString = allString[i].innerHTML;

      task_string = "cardId" + taskID[hrefAdder(taskTitleString)];
      console.log(task_string);
      allList[i].setAttribute("href", "trash.html#" + task_string);
      //allList[i].task_id += ;

      //allList[i].setAttribute("onclick", "OpenModal(this)");

      // console.log(allList[i]);
      // console.log(taskID[i]);
    }
    // } else if (document.getElementById("searchbox-home").hasFocus() == false) {
    //   searchWrapper.classList.remove("active"); //hide autocomplete box
  } else searchWrapper.classList.remove("active"); //hide autocomplete box
};

function select(element) {
  let selectData = element.textContent;
  SearchinputBox.value = selectData;
  // searchicon.onclick = () => {
  //   webLink = `https://www.google.com/search?q=${selectData}`;
  //   linkTag.setAttribute("href", webLink);
  //   linkTag.click();
  // };
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = SearchinputBox.value;
    listData = `<li>No Tasks Found<li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
}
