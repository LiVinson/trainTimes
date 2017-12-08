//INITIALIZE FIREBASE

  var config = {
    apiKey: "AIzaSyD2fd9wQ8lZGUUIVgEoRJ_ar2nYqr-7INM",
    authDomain: "traintimes-e732e.firebaseapp.com",
    databaseURL: "https://traintimes-e732e.firebaseio.com",
    projectId: "traintimes-e732e",
    storageBucket: "",
    messagingSenderId: "172900910680"
  };


  firebase.initializeApp(config);

  var database = firebase.database();

// WHEN SUBMIT BUTTON IS CLICKED 

$("#submitBtn").on("click", function(event) {

    console.log("Submit clicked - add a new train")

    //Grab user input and save into a variables(use moment to save the train start time)

    var trainName = $("#name").val().trim();
    console.log(trainName)

    var trainDest = $("#destination").val().trim();
    console.log(trainDest)

    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X"); //This should be converted to military time using moment
    console.log(firstTrain)

    var trainFreq = parseInt($("#frequency").val().trim())
    console.log(trainFreq)

    //Save into a newTrain object

    var newTrain = {
        name: trainName,
        destination: trainDest,
        first: firstTrain,
        frequency: trainFreq
    };

    //Push new train into the database

    database.ref().push(newTrain);

    //Clear the input fields
    $("#trainForm")[0].reset()

});


//FIREBASE EVENT: When child added

database.ref().on("child_added",function(childSnapshot, prevChildKey) {

    var trainInfo =  childSnapshot.val()
    console.log(childSnapshot.val());

    // Save the value of each key into a variable, or reference it by saving that child as variable

    var trainNameDisp = trainInfo.name;
    var trainDestDisp = trainInfo.destination;
    var firstTrainDisp = trainInfo.first;
    var trainFreqDisp = trainInfo.frequency;
    
    console.log(trainNameDisp);
    console.log(trainDestDisp);
    console.log(firstTrainDisp);
    console.log("Frequency: " + trainFreqDisp);
    
    // Make the start time the correct format using JS

    var minSinceStart = moment().diff(moment.unix(firstTrainDisp, "X"),); //minutes since the first train
    console.log("Since the first train: " + minSinceStart);

    console.log("Minutes since the first train: " + moment.unix(minSinceStart).format("minutes"));
    
    var minutesTill = trainFreqDisp - (minSinceStart % trainFreqDisp); 
    console.log("minutes til the next train: " +minutesTill);



    // var nextTrain = ""//curent time in minutes + minutesTill;

    // //Display the train data into the table

    // $("#trainTable > tbody").append(`<tr><td>${trainNameDisp}</td><td>${trainDestDisp}</td><td>${trainFreqDisp}</td>
    // <td>${nextTrain}</td><td>${minutesTill}</td><tr>`)

});










//BONUS:
// * Consider updating your "minutes to arrival" and "next train time" text once every minute.

// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements
//-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.