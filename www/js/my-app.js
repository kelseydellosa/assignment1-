//$(document).ready(function () {
//    $(".preloader").fadeOut(2300);
//});

var app = new Framework7({
	root: '#app',
	routes: [
		{
			path: '/',
			url: 'index.html'
        },
		{
			path: '/page2/',
			url: 'pages/page2.html'
        }
    ]
})

var mainView = app.views.create(".view-main");

console.log("bonjour");

var $$ = Dom7;

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
	todo: [],
	completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
	var value = document.getElementById('item').value;
	if (value) {
		addItem(value);
	}
});

document.getElementById('item').addEventListener('keydown', function (e) {
	var value = this.value;
	if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
		addItem(value);
	}
});

function addItem(value) {
	addItemToDOM(value);
	document.getElementById('item').value = '';

	data.todo.push(value);
	dataObjectUpdated();
}


function renderTodoList() {
	if (!data.todo.length && !data.completed.length) return;

	for (var i = 0; i < data.todo.length; i++) {
		var value = data.todo[i];
		addItemToDOM(value);
	}

	for (var j = 0; j < data.completed.length; j++) {
		var value = data.completed[j];
		addItemToDOM(value, true);
	}
}


function dataObjectUpdated() {
	localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	dataObjectUpdated();

	parent.removeChild(item);

}

function completeItem() {
	var item = this.parentNode.parentNode;
	var parent = item.parentNode;
	var id = parent.id;
	var value = item.innerText;

	if (id === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	} else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}
	dataObjectUpdated();

	//	 Check if the item should be added to the completed list or to re-added to the todo list
	var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	parent.removeChild(item);
	target.insertBefore(item, target.childNodes[0]);

}


// Adds a new item to the todo list
function addItemToDOM(text, completed) {
	var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

	var item = document.createElement('li');
	item.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;

	// Add click event for removing the item
	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;

	// Add click event for completing the item
	complete.addEventListener('click', completeItem);


	buttons.appendChild(remove);
	buttons.appendChild(complete);
	item.appendChild(buttons);

	list.insertBefore(item, list.childNodes[0]);

}

//show today's date 

const dateElement = document.getElementById("date");

const options = {
	weekday: "long",
	month: "short",
	day: "numeric"
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//var calendarModal = app.calendar.create({
//	inputEl: '#demo-calendar-modal',
//	openIn: 'customModal',
//	header: true,
//	footer: true,
//});

var quotes = [
	{
		author: "Jess C. Scott",
		source: "The Darker Side of Life",
		quote: "The brightest light casts the darkest shadow."
	},
	{
		quote: "To condense fact from the vapor of nuance."
	},
	{
		quote: "Falling burned and blinded through a Siberian sky."
	},
	{
		quote: "I’d been an outcast my entire life. Growing up with technophobe parents in the dawn of a Cyborg Age did that to a person."
	},
	{
		quote: "The Internet is the first thing that humanity has built that humanity doesn’t understand, the largest experiment in anarchy that we have ever had."
	},
	{
		quote: "You will be required to do wrong no matter where you go. It is the basic condition of life, to be required to violate your own identity."
	},
	{
		quote: "It’s impossible to move, to live, to operate at any level without leaving traces, bits, seemingly meaningless fragments of personal information. Fragments that can be retrieved, amplified…"
	},
	{
		quote: "No matter where you go, everyone’s connected."
	},
	{
		quote: "When you want to know how things really work, study them when they’re coming apart."
	},
	{
		quote: "Let me show you an endless trail of sunsets."
	},
	{
		quote: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched c-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die."
	},
	{
		quote: "See, the world is full of things more powerful than us. But if you know how to catch a ride, you can go places."
	},
	{
		quote: "Jack the sound barrier. Bring the noise."
	},
	{
		quote: "Well, all information looks like noise until you break the code."
	}
  ];
var quotesy = [
	{
		author: "Jess C. Scott",
		source: "The Darker Side of Life",
		quote: "kels"
	},
	{
		quote: "kels"
	},
	{
		quote: "kels"
	},
	{
		quote: "kels."
	},
	{
		quote: "The Internet is the first thing that humanity has built that humanity doesn’t understand, the largest experiment in anarchy that we have ever had."
	},
	{
		quote: "You will be required to do wrong no matter where you go. It is the basic condition of life, to be required to violate your own identity."
	},
	{
		quote: "It’s impossible to move, to live, to operate at any level without leaving traces, bits, seemingly meaningless fragments of personal information. Fragments that can be retrieved, amplified…"
	},
	{
		quote: "No matter where you go, everyone’s connected."
	},
	{
		quote: "When you want to know how things really work, study them when they’re coming apart."
	},
	{
		quote: "Let me show you an endless trail of sunsets."
	},
	{
		quote: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched c-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die."
	},
	{
		quote: "See, the world is full of things more powerful than us. But if you know how to catch a ride, you can go places."
	},
	{
		quote: "Jack the sound barrier. Bring the noise."
	},
	{
		quote: "Well, all information looks like noise until you break the code."
	}
  ];

function newQuote() {
	var randomNumber = Math.floor(Math.random() * (quotes.length));
	document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber].quote;

}

function newQuotes() {
	var randomNumbers = Math.floor(Math.random() * (quotesy.length));
	document.getElementById('quoteDisplays').innerHTML = quotesy[randomNumbers].quote;

}

//function init() {
//	var main;
//	var input = document.getElementByClass("button");
//	    input.addEventListener("click", function(){
//        var main_array= ["avocado","corn", "eggplant", "hotdog", "chicken"]
//        var rand = Math.floor(Math.random() * 4);
//        console.log(main_array[rand]); 
//        callAjax(main_array[rand], "main-info", "mainHash", "imagebox"); 
//        audio.play(); 
//
//    }); 
//
//}
