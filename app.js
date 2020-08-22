// Get the modal
var modal = document.getElementById("gameModal");

// Get the button that opens the modal
var startBtn = document.getElementById("startGame");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
startBtn.onclick = function() {
	//open the modal
  modal.style.display = "block";
  // call our function, sendApiRequest
  sendApiRequest();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



async function sendApiRequest (){
	let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
	console.log(response)
	let data = await response.json()
	console.log(data)
	useApiData(data)
}

function useApiData(data){
	document.querySelector("#category").innerHTML = `Category: ${data.results[0].category}`
	document.querySelector("#difficulty").innerHTML = `Difficulty: ${data.results[0].difficulty}`
	document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`
	document.querySelector("#answer1").innerHTML = data.results[0].correct_answer
	document.querySelector("#answer2").innerHTML = data.results[0].incorrect_answers[0]
	document.querySelector("#answer3").innerHTML = data.results[0].incorrect_answers[1]
	document.querySelector("#answer4").innerHTML = data.results[0].incorrect_answers[2]
}

let correctButton = document.querySelector("answer1")

correctButton.addEventListener("click", ()=> {
	alert("Correct! Nice job.")
})