//Link to firebase

var config = {
    apiKey: "AIzaSyDzUZXXHY05Sdeif56QvlPOGP8B5RCq5pI",
    authDomain: "trains-3ce1d.firebaseapp.com",
    databaseURL: "https://trains-3ce1d.firebaseio.com",
    storageBucket: "trains-3ce1d.appspot.com",
  };
  firebase.initializeApp(config);

	var database = firebase.database();

	//Initial values
	var trainName = "";
	var trainDest = "";
	var trainTime = "";
	var trainFreq = 0;

//Button for adding trains
$("#submitTrain").on("click", function(){

	//Getting new train input
	trainName = $('#addName').val().trim();
	trainDest = $('#addDestination').val().trim();
	trainTime = $('#addTime').val().trim();
	trainFreq = $('#addFreq').val().trim();

	//Creating temporary object for holding train data

	var newTrain = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	}

	//Uploads train data to the database
	database.ref().push({
		newTrain,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})

	//Logs everything to the console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	// Clears all of the text-boxes
	$("#addName").val("");
	$("#addDestination").val("");
	$("#addTime").val("");
	$("#addFreq").val("");

	//Prevents moving to new page
	return false;

});
//Create Firebase event for adding trains to the database and a row in the html with entries
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFreq = childSnapshot.val().frequency;

	//Make sure the time is in the right format



});