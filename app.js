// // const token = z0_8LZtVy6P7sLQ93VZrFQ;

var app = document.getElementById('root');

var container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var data = JSON.stringify({
  "token": "z0_8LZtVy6P7sLQ93VZrFQ",
  "data": {
    "nameFirst": "nameFirst",
    "personAvatar": "personAvatar",
    "jobTitle": "personTitle",
    "nickName": "personNickname",
    "_repeat": 9
  }
});

var request = new XMLHttpRequest();

request.onload = function(){
  // Access the JSON response generated from the request
  var fakeData = JSON.parse(this.response);

  // Conduct status check. We're doing some stuff for valid requests and a customary message for an invalid request.
  if (request.status >= 200 && request.status < 400) {
    fakeData.forEach(companyRole => {
	  // Create a div element with a class of "card"
	  var card = document.createElement('div');
	  card.setAttribute('class', 'card');

	  // Create an img element, populating it using the fake avatar retrieved from FakeJSON
	  var elem = document.createElement("img");
	  elem.setAttribute("src", companyRole.personAvatar);
	  elem.setAttribute("height", "180px");
	  elem.setAttribute("width", "100%");
	  elem.setAttribute("alt", "Profile Picture");

	  // Create a h1 element, populating it using the fake first name retrieved from FakeJSON
	  var h1 = document.createElement('h1');
	  h1.textContent = companyRole.nameFirst;

	  // Create a p element, populating it using the fake job title retrieved from FakeJSON
	  var p1 = document.createElement('p1');
	  p1.textContent = companyRole.jobTitle;

	  // Create a p element, populating it using the fake nickname retrieved from FakeJSON
	  var p2 = document.createElement('p2');
	  p2.textContent = 'Also known as "' + companyRole.nickName + '"';

	  // Create a line break element, to separate the two p elements
	  var br = document.createElement("br");

	  // Append the div class "card" element to the previously created div class "container" element
	  container.appendChild(card);

	  // Append the img, h1, and p elements previously created to the div class "card" element
	  card.appendChild(elem);
	  card.appendChild(h1);
	  card.appendChild(p1);
	  card.appendChild(br);
	  card.appendChild(p2);
    });
  } else {
    console.log('You shall not pass');
  }
}

request.open("POST", "https://app.fakejson.com/q");
request.setRequestHeader("content-type", "application/json");
request.send(data);