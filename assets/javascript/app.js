//Link to firebase

var config = {
    apiKey: "AIzaSyDzUZXXHY05Sdeif56QvlPOGP8B5RCq5pI",
    authDomain: "trains-3ce1d.firebaseapp.com",
    databaseURL: "https://trains-3ce1d.firebaseio.com",
    storageBucket: "trains-3ce1d.appspot.com",
  };
  firebase.initializeApp(config);

  //Create a variable to reference the database
	var database = firebase.database();

	//connectionsRef references a specific location in the database.
	var connectionsRef = database.ref("/connections");

	// '.info/connected' is a special location provided by Firebase that is updated every time the client's connection state changes.
	// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
	var connectedRef = database.ref(".info/connected");

	connectedRef.on("value", function(snap) {

		// If they are connected..
		if( snap.val() ) {

			// Add user to the connections list.
			var con = connectionsRef.push(true);

			// Remove user from the connection list when they disconnect.
			con.onDisconnect().remove();
		};
	});

	//Initial values
	var train = {
		Name: "",
		Dest: "",
		Time: "",
		Freq: 0,
	};

	var newTrain = train;

	//counter for views
	var viewCounter = 0;

	// At the initial load, get a snapshot of the current data.
	database.ref('/trains').on("value", function(snapshot) {

	//If firebase has trains stored, get a snapshot of the current trains
	//if(snapshot.child("newTrain").exists()) {
		console.log(childSnapshot.val());

		// newTrain = snapshot.val()newTrain;
		// //Show the trains stored in database
		// 	// Change the HTML to reflect the stored trains
		// 	//Train names
		// 	$('#name').append('<div class="row" id="nameRow">');
		// 	$('#nameRow').append(snapshot.val().newTrain.name);
		// 	//Add a new line for the next train
		// 	$('#nameRow').append("<br/>");
		// 	//Destination
		// 	$('#destination').append('<div class="row" id="destRow">');
		// 	$('#destRow').append(snapshot.val().newTrain.destination);
		// 	//Add a new line for the next train
		// 	$('#destRow').append("<br/>");
		// 	//Frequency
		// 	$('#frequency').append('<div class="row" id="freqRow">');
		// 	$('#freqRow').append(snapshot.val().newTrain.frequency);
		// 	//Add a new line for the next train
		// 	$('#freqRow').append("<br/>");
		// 	// Next train arrival
		// 	// Need to calculate for repopulating the database on load
		// 	// $('#next').append('<div class="row" id="nextRow">');
		// 	// $('#nextRow').append(snapshot.val().arrivalTime);
		// 	// //Add a new line for the next train
		// 	// $('#nextRow').append("<br/>");
		// 	// //Next train minutes away
		// 	// $('#away').append('<div class="row" id="awayRow">');
		// 	// $('#awayRow').append(tMinutesForTrain);
		// 	// //Add a new line for the next train
		// 	// $('#awayRow').append("<br/>");

		// 	// Print the initial data to the console.
		// 	console.log(snapshot.val().newTrain);
		//}
		//Keep the initial variables for newTrain
		//else {
		//do nothing
		//033
		+}
		// If any errors are experienced, log them to console.
		}, function (errorObject) {

		  	console.log("The read failed: " + errorObject.code);
	});

	//Button for adding trains
	$("#submitTrain").on("click", function(){

		//Getting new train input
		train.Name = $('#addName').val().trim();
		train.Dest = $('#addDestination').val().trim();
		train.Time = $('#addTime').val();
		train.Freq = $('#addFreq').val().trim();

		//Creating temporary object for holding train new

		var newTrain = {
			name: train.Name,
			destination: train.Dest,
			time: train.Time,
			frequency: train.Freq
		}

		//Uploads train data to the database
		database.ref().push({
			newTrain,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		})
	
		//function updateTime () {

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

		 	var arrivalTime = (moment(nextTrain).format("HH:mm A"));
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
		//}

		//Save
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

		// Stores name, destination, first time, and frequency into variables.
		// train.Name = childSnapshot.val().name;
		// train.Dest = childSnapshot.val().destination;
		// train.Time = childSnapshot.val().time;
		// train.Freq = childSnapshot.val().frequency;

});