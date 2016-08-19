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
	trainTime = $('#addTime').val();
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
	// console.log(newTrain.name);
	// console.log(newTrain.destination);
	//console.log(newTrain.time);
	// console.log(newTrain.frequency);
	
	//Push first time back a year to make sure it comes before current time
	var firstTimeConverted = moment(newTrain.time, "hh:mm")
		.subtract(1, "years");
		console.log(firstTimeConverted);

	//Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime)
		.format("hh:mm"));

	//Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + diffTime);

	//Time apart (remainder)
	var tRemainder = diffTime % newTrain.frequency;
	console.log(tRemainder);

	//Minutes until train
	var tMinutesForTrain = newTrain.frequency - tRemainder;
	console.log("Minutes for train: " + tMinutesForTrain);

	//Next Train
	var nextTrain = moment().add(tMinutesForTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

 	var arrivalTime = (moment(nextTrain).format("hh:mm A"));
 	console.log(arrivalTime);

	//Add trains to the schedule
	$('#name').append('<div class="row" id="nameRow">');
	$('#nameRow').append(newTrain.name);
	//Add a new line for the next train
	$('#nameRow').append("<br/>");
	//Destination
	$('#destination').append('<div class="row" id="destRow">');
	$('#destRow').append(newTrain.destination);
	//Add a new line for the next train
	$('#destRow').append("<br/>");
	//Frequency
	$('#frequency').append('<div class="row" id="freqRow">');
	$('#freqRow').append(newTrain.frequency);
	//Add a new line for the next train
	$('#freqRow').append("<br/>");
	//Next train arrival
	$('#next').append('<div class="row" id="nextRow">');
	$('#nextRow').append(arrivalTime);
	//Add a new line for the next train
	$('#nextRow').append("<br/>");
	//Next train minutes away
	$('#away').append('<div class="row" id="awayRow">');
	$('#awayRow').append(tMinutesForTrain);
	//Add a new line for the next train
	$('#awayRow').append("<br/>");

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

	





});