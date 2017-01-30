// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_Gywmfg4oLjkWjFnvj9cdtuwEyCbSTRw",
    authDomain: "train-times-fd5bb.firebaseapp.com",
    databaseURL: "https://train-times-fd5bb.firebaseio.com",
    storageBucket: "train-times-fd5bb.appspot.com",
    messagingSenderId: "861862913354"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainRef = database.ref("/trains");

$("#add-train-btn").on("click", function(){

	var train = $("#train-name-input").val();
	var destination = $("#destination-input").val();
	var	startTime = $("#start-input").val();
	var frequency = $("#frequency-input").val();

	var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(startTimeConverted), "minutes");
	var tRemainder = diffTime % frequency;
	var minutesAway = frequency - tRemainder;
	var nextTrain = moment().add(minutesAway, "minutes");
	var nextTrainConvert = moment(nextTrain).format("hh:mm");

	var trainList = trainRef.push({
		train:train,
		destination:destination,
		nextTrainConvert:nextTrainConvert,
		frequency:frequency,
		minutesAway:minutesAway
	});

	$("#train-name-input").val(" ");
	$("#destination-input").val(" ");
	$("#start-input").val(" ");
	$("#frequency-input").val(" ");
	console.log("clicked")

	return false;
});

trainRef.on("child_added",function(childSnapshot){
	console.log(childSnapshot.val().train);

	$("#train-table").append('<tr><td><span>' + childSnapshot.val().train +'</span></td>'+
								    '<td><span>' + childSnapshot.val().destination +'</span></td>'+
								    '<td><span>' + childSnapshot.val().frequency +'</span></td>'+
								    '<td><span>' + childSnapshot.val().nextTrainConvert +'</span></td>'+
								    '<td><span>' + childSnapshot.val().minutesAway +'</span></td>')
});