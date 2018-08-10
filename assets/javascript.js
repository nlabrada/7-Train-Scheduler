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

    // Onclick function for submit
    $(button).on("click", function(){
        var trainName = $("#trainNameInput").val
        var destination = $("#destinationInput").val
        var trainTime = $("#firstTrainInput").val
        var frequency = $("#frequencyInput").val
    })
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);







});