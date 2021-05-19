// lifeline disappears quickly after clicked
// score does not reset after finish quiz
let currentQuestion = 0;
let score = 0;
let bool = true;
let questions = [
   {
	"question": "Which country is the biggest in the world?",
	"a": "China",
	"b": "Russia",
	"c": "Canada",
	"d": "Vatican City",
	"image":"quizimages/q1.jpg",
	"answer": "b"
   },
   {
	"question": "What is the capital city of China?",
	"a": "Shanghai",
	"b": "Guangzhou",
	"c": "Beijing",
	"d": "Hong Kong",
	"image":"quizimages/q2.jpg",
	"answer": "c"
   },
   {
	"question": "What is the longest river in the world?",
	"a": "Nile River",
	"b": "Amazon River",
	"c": "Yangtze River",
	"d": "Amur River",
	"image":"quizimages/q3.jpg",
	"answer": "a"
   },
   {
	"question": "What is the capital city of Japan?",
	"a": "Sapporo",
	"b": "Tokyo",
	"c": "Osaka",
	"d": "Chiba",
	"image":"quizimages/q4.jpg",
	"answer": "b"
   },
   {
	"question": "What is the capital city of Republic of Korea or South Korea?",
	"a": "Busan",
	"b": "Ulsan",
	"c": "Pyongyang",
	"d": "Seoul",
	"image":"quizimages/q5.jpg",
	"answer": "d"
   },
   {
	"question": "What is the city that has the most population in the world?",
	"a": "Victoria",
	"b": "Sao Paulo",
	"c": "Tokyo",
	"d": "Delhi",
	"image":"quizimages/q6.jpg",
	"answer": "d"
   },
   {
	"question": "How many PROVINCES does Canada have?",
	"a": "13",
	"b": "15",
	"c": "10",
	"d": "12",
	"image":"quizimages/q7.jpg",
	"answer": "c"
   },
   {
	"question": "Which country listed below produces the most oil?",
	"a": "The United States",
	"b": "Fiji",
	"c": "Saudi Arabia",
	"d": "Russia",
	"image":"quizimages/q8.jpg",
	"answer": "a"
   },
   {
	"question": "How many times zones does Canada have?",
	"a": "3",
	"b": "4",
	"c": "5",
	"d": "6",
	"image":"quizimages/q9.jpg",
	"answer": "d"
   },
   {
	"question": "What is the most populated country in the world and how much people does it have?",
	"a": "India, 1 billion",
	"b": "China, 1.1 billion",
	"c": "China, 1.39 billion",
	"d": "India, 1.37 billion",
	"image":"quizimages/q10.jpg",
	"answer": "c"
   },
 ];
 
 
// load the service worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
let timeleft = 120;
let downloadTimer = setInterval(

	function()
	{
		document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
		
		timeleft--;
		
		bool = false;
		
		if (timeleft <= 0)
		{
			
			message = "You have failed to answer all questions in the time provided. Click to do again.";
			
			document.getElementById("lightbox").style.display = "block";
			document.getElementById("message").innerHTML = message;
			
			
			//clearInterval(downloadTimer);
			
			currentQuestion = 0;
			score = 0;
			document.getElementById("score").innerHTML = "";
			timeleft = 120;
			//loadQuestion();
			document.getElementById("lifeline").style.display = "block";
			
		
		} else {
			loadQuestion();
		}
		
	}, 1000);
 
 
 function loadQuestion() {
	 
	if (currentQuestion == 0 && bool == true) //FIX CLOSING LIGHTBOX
	{
		closeLightBox();
		
	} 
	else if(currentQuestion === questions.length)
	{
		message = "Congratulation! You have finished. Your score is " + score +" / " + questions.length + ". Click to start again!";
		
		//show the lightbox with feedback
		document.getElementById("lightbox").style.display = "block";
		document.getElementById("message").innerHTML = message;
		
		//clearInterval(downloadTimer);
		bool = false;
		
		timeleft = 120;
		currentQuestion = 0;
		document.getElementById("score").innerHTML = "";
		score = 0;
		document.getElementById("lifeline").style.display = "block";

		
	}
	
	document.getElementById("questionsAnswered").innerHTML = "Question Number " + (currentQuestion + 1) + "/" + questions.length;
	
	let img = document.getElementById ("image");
	let preLoadImage = new Image();
	preLoadImage.src = questions[currentQuestion].image;
	
	preLoadImage.onload = function () 
	{
		img.width = this.width;
	}
	
	img.style.width = "80%";
	img.src = preLoadImage.src;
	
    // load the question and answers
	
	
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
	document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
	document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
	document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
 } // loadQuestion
 
 
 function markIt(ans) {
	let message = "";
		
	// if the answer is correct 
	if (ans == questions[currentQuestion].answer) {
		score++;
		
	//display score on webpage
		document.getElementById("score").innerHTML = score + " / " + questions.length;
	
		message = "Excellent! you score is: " + score + " / " + questions.length;
	
	} else {
		message = "Oops! you got it wrong, and your score is "  + score + " / " + questions.length;
	}
	
	
	currentQuestion++;
	
	if (currentQuestion >= questions.length) 
	{
		document.getElementById("score").innerHTML = score + " / " + questions.length;
	
		message = "Congratulation! You have finished. Your score is " + score +" / " + questions.length + ". Click to start again!";
		
	} else {
		
	}
		

	document.getElementById("lightbox").style.display = "block";
	document.getElementById("message").innerHTML = message;
	
 }  // markIt
 
function lifeLine() 
{
  if (currentQuestion === 0) 
  {
    document.getElementById("a").innerHTML = "";
  } else if (currentQuestion === 1) {
    document.getElementById("d").innerHTML = "";
  } else if (currentQuestion === 2) {
    document.getElementById("b").innerHTML = "";
  } else if (currentQuestion === 3) {
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion === 4) {
    document.getElementById("c").innerHTML = "";
  } else if (currentQuestion === 5) {
    document.getElementById("a").innerHTML = "";
  } else if (currentQuestion === 6) {
    document.getElementById("d").innerHTML = "";
  } else if (currentQuestion === 7) {
    document.getElementById("b").innerHTML = "";
  } else if (currentQuestion === 8) {
    document.getElementById("a").innerHTML = "";
  } else if (currentQuestion === 9) {
    document.getElementById("c").innerHTML = "";

  }
  document.getElementById("lifeline").style.display = "none";
}
 

 
function skipQuestion ()
{
	currentQuestion++;
	if (currentQuestion >= questions.length) {
		
	} else {
		loadQuestion();
	}
}
	

 
 function closeLightBox () {
	document.getElementById("lightbox").style.display = "none";
 }
 
 
 
 
 
 
 
 
 
 
   
