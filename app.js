$(document).ready(function () {


	// Get the modal
	var modal = document.getElementById("gameModal");

	// Get the button that opens the modal
	var startBtn = document.getElementById("startGame");

	// Get the <span> element that closes the modal
	var closeBtn = document.getElementsByClassName("close")[0];

	// Creates a counter showing how many questions were answered correctly
	let score = 0;

	// When the user clicks on the button, open the modal 
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


	// this function pulls the api data one question at a time
	async function sendApiRequest() {
		let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
		console.log(response)
		let data = await response.json()
		console.log(data)
		useApiData(data)
	};

	// This function uploads the Api data into the corresponding html element
	function useApiData(data) {
		$('#category').html(`Category: ${data.results[0].category}`)
		$('#difficulty').html(`Difficulty: ${data.results[0].difficulty}`)
		$('#question').html(`Question: ${data.results[0].question}`)
		shuffle();
		$("#answer1").html(data.results[0].correct_answer)
		$("#answer2").html(data.results[0].incorrect_answers[0])
		$("#answer3").html(data.results[0].incorrect_answers[1])
		$("#answer4").html(data.results[0].incorrect_answers[2])
	};

	// function to shuffle the answers' order 
	function shuffle(e) {
		const parent = $("#shuffle");
		const divs = parent.children();
		while (divs.length) {
			parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
		}
	}


		// This function color-codes the correct answer green and incorrect answers red
		function outlineAnswers() {
			$("#answer1").toggleClass("blue-gradient").toggleClass('dusty-grass-gradient');
			$("#answer2").toggleClass("blue-gradient").toggleClass('young-passion-gradient');
			$("#answer3").toggleClass("blue-gradient").toggleClass('young-passion-gradient');
			$("#answer4").toggleClass("blue-gradient").toggleClass('young-passion-gradient');
			$("#score").text(`Score: ${score}`)
		};

		// Correct Answer 1 onClick function
		$("#answer1").click(function (event) {
			outlineAnswers();
			$("#response").text("You are correct!");
			score++;
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
			outlineAnswers();
			$("#response").text("");
			sendApiRequest();
		});
	});