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

  // ===================================================================================
  // Options
  // ===================================================================================
  $("#backgroundImg");
  // ===================================================================================
  // High Scores
  // ===================================================================================

  $("#saveBtn");
});
