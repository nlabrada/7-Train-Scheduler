// Waiting for page to load!
$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBW1ctVkn53v0VSW9WZ7q6otLyoKCkjl94",
        authDomain: "train-scheduler-7959a.firebaseapp.com",
        databaseURL: "https://train-scheduler-7959a.firebaseio.com",
        projectId: "train-scheduler-7959a",
        storageBucket: "",
        messagingSenderId: "322988981497"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Onclick function for submit
    $("#submit-btn").on("click", function(event){
        console.log("clicked");
        event.preventDefault();

        var newName = $("#trainNameInput").val().trim();
        var newDestination = $("#destinationInput").val().trim();
        var newTrainTime = moment($("#firstTrainInput").val().trim(),"HH:mm").format("hh:mm");
        var newFrequency = $("#frequencyInput").val().trim();

        var newTrain = {
            name: newName,
            destination: newDestination,
            trainTime: newTrainTime,
            frequency: newFrequency,
        }
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.trainTime);
        console.log(newTrain.frequency);

        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");

    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var newName = childSnapshot.val().name;
        var newDestination = childSnapshot.val().destination;
        var newTrainTime = childSnapshot.val().trainTime;
        var newFrequency = childSnapshot.val().frequency;
      
        // Employee Info
        console.log(newName);
        console.log(newDestination);
        console.log(newTrainTime);
        console.log(newFrequency);

        // First time train came 1 year ago
        var newTrainTimeConverted = moment(newTrainTime, "HH:mm").subtract(1, "years");
        console.log(newTrainTimeConverted);
        // Giving you the current time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between times
        var diffTime = moment().diff(moment(newTrainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Gives remainder between the two
        var tRemainder = diffTime % newFrequency;
        console.log(tRemainder);
        // Minutes for next train
        var tMinutesTillTrain = newFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            


    
        //for creating and attaching new row in table
        var newRow = $("<tr>").append(
            $("<th>").append(newName),
            $("<td>").append(newDestination),
            $("<td>").append(newFrequency),
            $("<td>").append(moment(nextTrain).format("hh:mm")),
            $("<td>").append(tMinutesTillTrain),
        );

        $("#train-table > tbody").append(newRow);
    });
});