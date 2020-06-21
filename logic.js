

let random = Math.floor((Math.random() * 100) + 1);
console.log(random)
let previous = []
let turn = 0
var pos = 0;
let win = false;

let reload = document.getElementById("reload");
reload.style.display = "none"
// hide all
let main = document.getElementById('main')
main.style.display = "none"
let signIn = document.querySelector('.signIn')
let username = document.querySelector('.username')
// username.style.display = "none"
let level = document.querySelector('.level')
level.style.display = "none"



document.getElementById("input").value = null;

// Register
function register() {
  username.style.display = "inline-block";
  signIn.style.display = 'none'
}

// username
function getUsername() {
	let username = document.querySelector("#username").value;
	level.style.display = "inline-block"
	document.querySelector(".username").style.display = "none";
	document.querySelector("#the_username").innerHTML = username;

	console.log(username)
}

// Level
function getLevel() {
	// myMove();
	let this_level = document.querySelector('input[name="level"]:checked').value
	document.querySelector(".level").style.display = "none";
	main.style.display = "inline-block";
  animation.style.display='block'

	if (this_level == 'easy') turn = 20
	else if (this_level == 'normal') turn = 10
	else if (this_level =='expert') turn = 5

	document.getElementById("turn").innerHTML = turn;

	console.log(this_level)
	console.log(turn)
	
}

// Refresh
function newGame() {
	
	 location.reload(); 

}

// Submit
  document.getElementById("input")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("btn").click();
      }
  });

function submit() {
  let input = document.getElementById("input").value
  myMove();

  //Turns 
  if (turn > 1) {
  	turn--	
    
  }
  else {
  	turn = 0;
  	document.getElementById("btn").disabled = true;
  	document.getElementById("input").disabled = true;
  	reload.style.display = "inline";
  }
  document.getElementById("turn").innerHTML = turn;


  // Guest Write or wrong
  if (input != random) {
  	previous.push(input)
    document.getElementById("input").value = null;
  	document.getElementById("previous").innerHTML = previous.join(' | ');

  	if (input > random) {
  		document.getElementById("guest").innerHTML = "Too High!";
  	}
  	else if (input < random) {
  		document.getElementById("guest").innerHTML = "Too Low!";
  	}
  	else document.getElementById("guest").innerHTML = "Wrong Input!";
  	
  }
  else if (input == random) {
    // pos = 0;
    win = true;
    // animation.style.display = 'none'
  	document.getElementById("guest").innerHTML = "Correct!";
  	document.getElementById("btn").disabled = true;
  	document.getElementById("input").disabled = true;
  	reload.style.display = "inline";
    alert('WIN')
  }
  else document.getElementById("guest").innerHTML = "Wrong Input!";

}

// Animation
let niddle = document.querySelector('.niddle');
let pop = document.querySelector('.pop')
let balloon = document.querySelector('.balloon')
let all = document.querySelector('.container')
let animation = document.querySelector('.animation')
animation.style.display='none'

function myMove() {
  
  var id = setInterval(frame, turn*70);
  function frame() {

    if (pos == 173) {
      clearInterval(id);
      all.style.display = 'none';
      balloon.style.display = 'none';
      niddle.style.display = 'none';
      pop.style.display = 'inline-block';
      document.getElementById("btn").disabled = true;
      document.getElementById("input").disabled = true;
      reload.style.display = "inline";
      alert('LOSER!')
      
    } 
    if (win == true) clearInterval(id);
    else {
      pos ++ ;
      niddle.style.left = pos + 'px';

    }
    
  }
}



