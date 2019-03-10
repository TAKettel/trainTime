// Initialize Firebase
var config = {
  apiKey: "AIzaSyDY6okLKrW8-xk3qOGhWyE9S6lj-ZLZG28",
  authDomain: "projectproject-f0afe.firebaseapp.com",
  databaseURL: "https://projectproject-f0afe.firebaseio.com",
  projectId: "projectproject-f0afe",
  storageBucket: "projectproject-f0afe.appspot.com",
  messagingSenderId: "848571817001"
};
firebase.initializeApp(config);

// button to accept data, push to firebase
// all past trains will show in the firebase data

let database = firebase.database();
let trainName = "";
let trainPlace = "";
let trainTime = "";
let trainOften = "";

// Submit button click.
$("#addTrain").on("click", function(event) {
    event.preventDefault();

  // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    trainPlace = $("#destination").val().trim();
    trainTime = $("#startTime").val().trim();
    trainOften = $("#frequency").val().trim();

  // Code for handling the push
    database.ref().push({
        name: trainName,
        destination: trainPlace,
        startTime: trainTime,
        frequency: trainOften
    });
});

// Firebase watcher: to occur when a new train is submitted.
database.ref().on("child_added", function(snapshot) {

    let name = snapshot.val().name;
    let destination = snapshot.val().destination;
    let startTime = snapshot.val().startTime;
    let frequency = snapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTrain = moment(startTime, "HH:mm").subtract(1, "years");
    let timeDiff = moment().diff(moment(firstTrain), "minutes");
    let timeLeft = timeDiff % frequency;
    let timeToGo = frequency - timeLeft;
    let nextArrival = moment().add(timeToGo, "minutes").format("HH:mm");

    let newTrain = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(timeToGo),
    );
    
    console.log(newTrain);
    $("#trainTable").append(newTrain);
})