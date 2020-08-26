$(document).ready(function () {
  // ===================================================================================
  // Endless Game Mode
  // ===================================================================================
  {
    let score = 0; // Creates a counter showing how many questions were answered correctly

    var modal = document.getElementById("gameModal"); // get the endless game mode modal

    var startBtn = document.getElementById("startGame"); // Get the button that opens the modal

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
      $("#question").html(`Question: ${data.results[0].question}`);
      shuffle();
      $("#answer1").html(data.results[0].correct_answer);
      $("#answer2").html(data.results[0].incorrect_answers[0]);
      $("#answer3").html(data.results[0].incorrect_answers[1]);
      $("#answer4").html(data.results[0].incorrect_answers[2]);
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
    function outlineAnswers() {
      if ($("#answer1").hasClass("blue-gradient")) {
        $("#answer1")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-success");
        $("#answer2")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#answer3")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#answer4")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#score").text(`Score: ${score}`);
      }
    }
    function resetOutline() {
      if ($("#answer1").hasClass("btn-outline-success")) {
        $("#answer1")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-success");
        $("#answer2")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#answer3")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#answer4")
          .toggleClass("blue-gradient")
          .toggleClass("btn-outline-danger");
        $("#score").text(`Score: ${score}`);
      }
    }
    // Correct Answer 1 onClick function
    $("#answer1").click(function (event) {
      if ($("#answer1").hasClass("blue-gradient")) {
        score++;
        $("#response").text("You are correct!");
      }
      outlineAnswers();
      console.log("it worked");
    });

    // Incorrect Answer 2 onClick function
    $("#answer2").click(function (event) {
      outlineAnswers();
      $("#response").text("You are wrong!");
    });

    // Incorrect Answer 3 onClick function
    $("#answer3").click(function (event) {
      outlineAnswers();
      $("#response").text("You are wrong!");
    });

    // Incorrect Answer  4 onClick function
    $("#answer4").click(function (event) {
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
      $("#question")
        .html(`Your final score: ${score}`)
        .append(newHTML.join(""));
      $("#category").hide();
      $("#difficulty").hide();
      $("#score").hide();
      $("#answer1").hide();
      $("#answer2").hide();
      $("#answer3").hide();
      $("#answer4").hide();
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

  // question one pathway: results[0]
  // Timer
  // 

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

  let triviaURL = `https://opentdb.com/api.php?`;

  let category = "";
  let amount = "5"

  function getQuestions(triviaURL) {
    $.ajax({
      url: triviaURL,
      method: "GET"
    }).done(function (triviaQ) {
      console.log(triviaQ);
    });
  }

  function changeSettings() {
    amount = $("#numSelect").val();
    triviaURL = triviaURL + `amount=${amount}`
    category = $("#categorySelect").val();
    triviaURL = triviaURL + `&category=${category}`;
    difficulty = $("#difficultySelect").val();
    triviaURL = triviaURL + `&difficulty=${difficulty}`;
    console.log(triviaURL);
    getQuestions(triviaURL);
  }
  //------------------------------------------------------------------------------------
  //Photo-API "Unsplash"

  const APIKey = `b6D6Vk41Z56yMWK4umGb0HfLtJX4Z-MVIbJcVAIk5mM`;

  let photosURL = `https://api.unsplash.com/search/photos/?client_id=${APIKey}`;

  let searchTerm = "";

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
  // Show the name
  // Show the options settings
  $("#saveBtn");
});
