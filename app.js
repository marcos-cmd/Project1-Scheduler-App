$(document).ready(function () {

  // ===================================================================================
  // Endless Game Mode
  // ===================================================================================
  {
    let score = 0; // Creates a counter showing how many questions were answered correctly

    var modal = document.getElementById("gameModal"); // get the endless game mode modal

    var startBtn = document.getElementById("startGame");
    // Get the button that opens the modal

    var closeBtn = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

    // When the user clicks on the button, open the endless game mode Modal
    startBtn.onclick = function () {
      //open the modal
      modal.style.display = "block";
      // call our function, sendApiRequest
      sendApiRequest();
    };
    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    // this function pulls the api data one question at a time for endless mode
    async function sendApiRequest() {
      let response = await fetch(
        `https://opentdb.com/api.php?amount=1&type=multiple`
      );
      console.log(response);
      let data = await response.json();
      console.log(data);
      useApiData(data);
    }

    // This function uploads the Api data into the corresponding html element of the endless game mode Modal
    function useApiData(data) {
      $("#category").html(`Category: ${data.results[0].category}`);
      $("#difficulty").html(`Difficulty: ${data.results[0].difficulty}`);
      $("#endlessQuestion").html(`Question: ${data.results[0].question}`);
      shuffle();
      $("#endlessAnswer1").html(data.results[0].correct_answer);
      $("#endlessAnswer2").html(data.results[0].incorrect_answers[0]);
      $("#endlessAnswer3").html(data.results[0].incorrect_answers[1]);
      $("#endlessAnswer4").html(data.results[0].incorrect_answers[2]);
    }

    // function to shuffle the endless game mode's answers' order
    function timedShuffle(e) {
      const parent = $("#timedShuffle");
      const divs = parent.children();
      while (divs.length) {
        parent.append(
          divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
        );
      }
    }

    // This function color-codes the correct answer green and incorrect answers red
    function outlineAnswers() {
      if ($("#endlessAnswer1").hasClass("blue-gradient")) {
        $("#endlessAnswer1")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-success");
        $("#endlessAnswer2")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#endlessAnswer3")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#endlessAnswer4")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#score").text(`Score: ${score}`);
      }
    }
    function resetOutline() {
      if ($("#endlessAnswer1").hasClass("btn-outline-success")) {
        $("#endlessAnswer1")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-success");
        $("#endlessAnswer2")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#endlessAnswer3")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#endlessAnswer4")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#score").text(`Score: ${score}`);
      }
    }
    // Correct Answer 1 onClick function
    $("#endlessAnswer1").click(function (event) {
      if ($("#endlessAnswer1").hasClass("blue-gradient")) {
        score++;
        $("#response").text("You are correct!");
      }
      outlineAnswers();
      console.log("it worked");
    });

    // Incorrect Answer 2 onClick function
    $("#endlessAnswer2").click(function (event) {
      outlineAnswers();
      $("#response").text("You are wrong!");
    });

    // Incorrect Answer 3 onClick function
    $("#endlessAnswer3").click(function (event) {
      outlineAnswers();
      $("#response").text("You are wrong!");
    });

    // Incorrect Answer  4 onClick function
    $("#endlessAnswer4").click(function (event) {
      outlineAnswers();
      $("#response").text("You are wrong!");
    });

    // Next Button onClick function
    $("#nextQ").click(function (event) {
      resetOutline();
      $("#response").text("");
      sendApiRequest();
    });

    //End game button onClick function
    $("#endGame").click(function (event) {
      const newHTML = [
        '<div class="md-form">',
        '<input id="name" value="John Doe" type="text" class="form-control w-25 mx-auto text-center text-white">',
        "</div>",
        "<br>",
        '<button class="btn blue-gradient btn-rounded mb-4" id="saveBtn">Save High Score',
        "</button>",
      ];
      // Displays high score, name input, and save high score button
      $("#endlessQuestion").html(`Your final score: ${score}`).append(newHTML.join(""));
      $("#category").hide();
      $("#difficulty").hide();
      $("#score").hide();
      $("#endlessAnswer1").hide();
      $("#endlessAnswer2").hide();
      $("#endlessAnswer3").hide();
      $("#endlessAnswer4").hide();
      $("#nextQ").hide();
      $("#endGame").hide();
    });
  }
  // ===================================================================================
  // Timed Game Mode
  // ===================================================================================
  // Open Timed Game modal onClick function
  $("#startTimed").click(function (event) {
    $("#timeModal").show();
    useTriviaQ(triviaQ);
    setTimer();
  });
  // close timed game modal when clicking "x"
  $(".close").click(function (event) {
    $("#timeModal").hide();
  });
  // close timed game modal when clicking outside modal
  $(window).click(function (event) {
    if (event.target == timeModal) {
      $("#timeModal").hide();
    }
  });

  // Score is related time left for question (If you answer at the last second, you get 1/30 points)
  var timedScore = 0;
  var counter = 0;

  function useTriviaQ(triviaQ) {
    $("#timedEndGame").hide();
    if (counter < triviaQ.results.length) {
      $("#timedCategory").html(`Category: ${triviaQ.results[counter].category}`);
      $("#timedDifficulty").html(`Difficulty: ${triviaQ.results[counter].difficulty}`);
      $("#timedQuestion").html(`Question: ${triviaQ.results[counter].question}`);
      shuffle();
      $("#timedAnswer1").html(`${triviaQ.results[counter].correct_answer}`);
      $("#timedAnswer2").html(`${triviaQ.results[counter].incorrect_answers[0]}`);
      $("#timedAnswer3").html(`${triviaQ.results[counter].incorrect_answers[1]}`);
      $("#timedAnswer4").html(`${triviaQ.results[counter].incorrect_answers[2]}`);  
      $("#timedBackgroundImg").attr("style", "background-image:" + ` url(${photos.results[counter].urls.regular});"`);
    } else if (counter = ((triviaQ.results.length) - 1)){
      $("#timedEndGame").show();
    }
  }

  // function to shuffle the endless game mode's answers' order
  function shuffle(e) {
    const parent = $("#shuffle");
    const divs = parent.children();
    while (divs.length) {
      parent.append(
        divs.splice(Math.floor(Math.random() * divs.length), 1)[0]
      );
    }
  }

  // This function color-codes the correct answer green and incorrect answers red
  function timedOutlineAnswers() {
    if ($("#timedAnswer1").hasClass("blue-gradient")) {
      $("#timedAnswer1")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-success");
      $("#timedAnswer2")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedAnswer3")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedAnswer4")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedScore").text(`Score: ${timedScore}`);
    }
  }
  function timedResetOutline() {
    if ($("#timedAnswer1").hasClass("btn-outline-success")) {
      $("#timedAnswer1")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-success");
      $("#timedAnswer2")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedAnswer3")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedAnswer4")
        .toggleClass("blue-gradient")
        .toggleClass("btn-outline-danger");
      $("#timedScore").text(`Score: ${timedScore}`);
    }
  }
  // Correct Answer 1 onClick function
  $("#timedAnswer1").click(function (event) {
    if ($("#timedAnswer1").hasClass("blue-gradient")) {
      timedScore++;
      timedScore = timedScore + timerScore;
      $("#timedResponse").text("You are correct!");
    }
    timedOutlineAnswers();
    console.log("it worked");
  });

  // Incorrect Answer 2 onClick function
  $("#timedAnswer2").click(function (event) {
    timedOutlineAnswers();
    $("#timedResponse").text("You are wrong!");
  });

  // Incorrect Answer 3 onClick function
  $("#timedAnswer3").click(function (event) {
    timedOutlineAnswers();
    $("#timedResponse").text("You are wrong!");
  });

  // Incorrect Answer  4 onClick function
  $("#timedAnswer4").click(function (event) {
    timedOutlineAnswers();
    $("#timedResponse").text("You are wrong!");
  });

  // Next Button onClick function
  $("#timedNextQ").click(function (event) {
    timedResetOutline();
    $("#timedResponse").text("");
    counter++;
    useTriviaQ(triviaQ);
    setTimer();
  });

  $("#timedEndGame").click(function (event) {
    const newHTML = [
      '<div class="md-form">',
      '<input id="playerName" value="John Doe" type="text" class="form-control w-25 mx-auto text-center text-white">',
      "</div>",
      "<br>",
      '<button class="btn blue-gradient btn-rounded mb-4" id="timedSaveBtn">Save High Score',
      "</button>",
    ];
    // Displays high score, name input, and save high score button
    $("#timedQuestion").html(`Your final score: ${timedScore}`).append(newHTML.join(""));
    $("#timedCategory").hide();
    $("#timedDifficulty").hide();
    $("#timedScore").hide();
    $("#timedAnswer1").hide();
    $("#timedAnswer2").hide();
    $("#timedAnswer3").hide();
    $("#timedAnswer4").hide();
    $("#timedNextQ").hide();
    $("#timedResponse").hide();
    $("#timedEndGame").hide();
    $("#Timer").hide();
  });

  // Timer
  var timerScore = 0;
    function setTimer() {
    var timeleft = $("#timerSelect").val();
    var downloadTimer = setInterval(function () {
      timerScore = parseInt(timeleft);
        console.log(timerScore);
      if (timeleft <= 0) {
        $("#Timer").html(`Time's Up!`);
        clearInterval(downloadTimer);
        //   document.getElementById("countdown").innerHTML = "Finished";
      }  else if ($("#timedAnswer1").hasClass("btn-outline-success")){
        clearInterval(downloadTimer);
      } else {
        $("#Timer").html(`Timer: ${timeleft}`);
      }
      timeleft -= 1;
    }, 1000);
  }

  // ===================================================================================
  // Options
  // ===================================================================================

  // Open Options modal onClick function
  $("#startOptions").click(function (event) {
    $("#optionsModal").show();
  });
  // close options modal when clicking "x"
  $(".close").click(function (event) {
    $("#optionsModal").hide();
  });
  // close options modal when clicking outside modal
  $(window).click(function (event) {
    if (event.target == optionsModal) {
      $("#optionsModal").hide();
    }
  });

  //------------------------------------------------------------------------------------
  // TRIVIA API : https://opentdb.com/
  const triviaURL = `https://opentdb.com/api.php?`;
  let newTriviaURL;
  // let amount = 5;
  // let amount = $("#numSelect").val();
  let triviaQ;

  function changeSettings() {
    let category = "";
    let amount = $("#numSelect").val();

    //console log 
    console.log("numSelect: " + $("#numSelect").val());
    console.log("amount: " + amount);

    amountURL = `amount=${amount}`;
    category = $("#categorySelect").val();
    categoryURL = `&category=${category}`;
    difficulty = $("#difficultySelect").val();

    //console log
    console.log("category: " + category);
    console.log("difficulty: " + difficulty);

    difficultyURL = `&difficulty=${difficulty}`;
    newTriviaURL = triviaURL + amountURL + categoryURL + difficultyURL + `&type=multiple`;
    console.log("amount: " + triviaURL);
    getQuestions(newTriviaURL);
    console.log("newTriviaURL = " + newTriviaURL);

  }

  function getQuestions(newTriviaURL) {
    $.ajax({
      url: newTriviaURL,
      method: "GET"
    }).done(function (data) {
      console.log(data);
      triviaQ = data;
      console.log(triviaQ);      
      // triviaQ.push(data);

    })
  }

  //------------------------------------------------------------------------------------
  //Photo-API "Unsplash"

  const APIKey = `b6D6Vk41Z56yMWK4umGb0HfLtJX4Z-MVIbJcVAIk5mM`;

  let photosURL = `https://api.unsplash.com/search/photos/?client_id=${APIKey}`;

  let searchTerm = "";

  let photos;

  function getPhotos(photosURL) {
    $.ajax({
      url: photosURL,
      method: "GET"
    }).done(function (photoData) {
      console.log(photoData);
      // We want this to pull the same amount of images as questions
      let image = photoData.results[1].urls.regular + "fit=fillmax&crop=entropy";
      console.log(image);
      // We want this to loop through each photo as you move on to the next question
      $("#testImage").attr("src", `${image}`);
      photos = photoData;
    });
  }

  function photoSettings() {
    // This should pull a keyword based on the category selected
    if ($("#categorySelect").val() == "any") {
      searchTerm = "random";
    }
    else if ($("#categorySelect").val() == 9) {
      searchTerm = "knowledge";
    }
    else if ($("#categorySelect").val() == 10) {
      searchTerm = "books";
    }
    else if ($("#categorySelect").val() == 11) {
      searchTerm = "film";
    }
    else if ($("#categorySelect").val() == 12) {
      searchTerm = "music";
    }
    else if ($("#categorySelect").val() == 13) {
      searchTerm = "theatre";
    }
    else if ($("#categorySelect").val() == 14) {
      searchTerm = "television";
    }
    else if ($("#categorySelect").val() == 15) {
      searchTerm = "video games";
    }
    else if ($("#categorySelect").val() == 16) {
      searchTerm = "board games";
    }
    else if ($("#categorySelect").val() == 17) {
      searchTerm = "nature";
    }
    else if ($("#categorySelect").val() == 18) {
      searchTerm = "computers";
    }
    else if ($("#categorySelect").val() === 19) {
      searchTerm = "math";
    }
    else if ($("#categorySelect").val() == 20) {
      searchTerm = "mythology";
    }
    else if ($("#categorySelect").val() == 21) {
      searchTerm = "sports";
    }
    else if ($("#categorySelect").val() == 22) {
      searchTerm = "maps";
    }
    else if ($("#categorySelect").val() == 23) {
      searchTerm = "historic";
    }
    else if ($("#categorySelect").val() == 24) {
      searchTerm = "political";
    }
    else if ($("#categorySelect").val() == 25) {
      searchTerm = "art";
    }
    else if ($("#categorySelect").val() == 26) {
      searchTerm = "celebrity";
    }
    else if ($("#categorySelect").val() == 27) {
      searchTerm = "animals";
    }
    else if ($("#categorySelect").val() == 28) {
      searchTerm = "vehicles";
    }
    else if ($("#categorySelect").val() == 29) {
      searchTerm = "comics";
    }
    else if ($("#categorySelect").val() == 30) {
      searchTerm = "gadgets";
    }
    else if ($("#categorySelect").val() == 31) {
      searchTerm = "anime";
    }
    else if ($("#categorySelect").val() == 32) {
      searchTerm = "cartoons";
    }

    console.log(`Category: ${searchTerm}`)
    photosURL = (photosURL + "&query=" + searchTerm);
    console.log(photosURL);
    getPhotos(photosURL);
  }
  $('#changeSettings').on('click', function () {
    changeSettings();
    photoSettings();
  });
  // ===================================================================================
  // High Scores
  // ===================================================================================
  $("#startScores").click(function (event) {
    $("#scoreModal").show();
  });
  // close timed game modal when clicking "x"
  $(".close").click(function (event) {
    $("#scoreModal").hide();
  });
  // close timed game modal when clicking outside modal
  $(window).click(function (event) {
    if (event.target == scoreModal) {
      $("#scoreModal").hide();
    }
  });

const playerName = $("playerName").val();
const player = {
  name: playerName, 
  score: timedScore
}

$("#timedSaveBtn").click(function (event) {
  saveToLocalStorage(player);
  console.log(player);
});

const displayRankings = (currentPlayer = {}) => {
  const players = JSON.parse(localStorage.getItem('players'));

  const rankings = $(`<div class="card">
                    <div class= "card-header">
                      <h3>Score Table</h3>
                    </div>
                  </div >`);

  const playerList = $('<ul class="list-group list-group-flush"></ul>');
  
  if(players !== null) {
    sortArray(players);
    players.forEach((player, index) => {
      if (currentPlayer.name === player.name && currentPlayer !== {}) {
        playerList.append(`<li class="list-group-item font-weight-bold mt-1">${index + 1}. ${player.name} <span class="player_score">${player.timedScore}</span></li>`);
      } else {
        playerList.append(`<li class="list-group-item mt-1">${index + 1}. ${player.name} <span class="player_score">${player.timedScore}</span></li>`);
      }
    })
  }
  
  rankings.append(playerList);
  $('#score_table').append(rankings);
}

// Array that sorts the players array by the score
const sortArray = (arr) => {
  arr.sort((a, b) => {
    const scoreA = a.score;
    const scoreB = b.score;
    if (scoreA < scoreB)
      return 1
    if (scoreA > scoreB)
      return -1
    return 0
  })
}

//saves to local storage
function saveToLocalStorage(player) {
  if (localStorage.getItem('players')===null) {
    const players = [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  } else {
    const players = JSON.parse(localStorage.getItem('players'));
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  }
}

  // Show the name
  // Show the options settings
  $("#saveBtn");
});
