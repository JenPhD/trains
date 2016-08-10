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
	var trainName = $("#addName").val().trim();
	var trainDest = $("#addDestination").val().trim();
	var trainTime = $("#addTime").val().trim();
	var trainFreq = $("#addFreq").val().trim();

	//Creating temporary object for holding train data

	var newTrain = {
		name: trainName,
		destination: trainDest,
		time: trainTime
		frequency: trainFreq
	}

	//Uploads train data to the database
	database.ref().push(newTrain);

	//Logs everything to the console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	//Prevents moving to new page
	return false;

});

//Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().time);
	console.log(snapshot.val().frequency);
});