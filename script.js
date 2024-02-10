import { Team, Player } from './team.js';

// --------------------------- GESTION DES ELEMENTS DU DOM ET CLASSES ------------------------------------

let currentTeam;
let currentPlayer;
// Create player instances
const spursPlayer = new Player("Devin Vassel", "./res/Spurs/DEVIN VASSELL.png");
const sixersPlayer = new Player("Joel Embiid", "./res/76ers/JOEL EMBIID.png", "Skill level 2");
const bullsPlayer = new Player("DeMar", "./res/Bulls/DeMar.png", "Skill level 3");

// Create team instances with corresponding players
const spursTeam = new Team(2, "Spurs", "./res/Spurs/spurs.png", "black");
const sixersTeam = new Team(1, "76ers", "./res/76ers/76ers2.svg", "rgb(40, 86, 184)");
const bullsTeam = new Team(1, "Bulls", "./res/Bulls/Bulls_de_Chicago_logo.svg", "white");






function setImage(){
    document.getElementById('team-img 1').src = spursTeam.img;
    document.getElementById('team-img 2').src = sixersTeam.img;
    document.getElementById('team-img 3').src = bullsTeam.img;
}

setImage()

// Add an event listener to each team image
document.getElementById('team-img 1').addEventListener('click', () => {
    setTeam(spursTeam);
    setPlayer(spursPlayer)
});

document.getElementById('team-img 2').addEventListener('click', () => {
    setTeam(sixersTeam);
    setPlayer(sixersPlayer)

});

document.getElementById('team-img 3').addEventListener('click', () => {
    setTeam(bullsTeam);
    setPlayer(bullsPlayer)
});


// Function to set the current team
function setTeam(team) {
    // Set the current team
    currentTeam = team;
    // Display the inherited image on the chest
    let maillot = document.querySelector('.chest');
    maillot.style.backgroundImage = `url('${currentTeam.img}')`;
    maillot.style.backgroundSize = 'contain';
    maillot.style.backgroundColor = team.color;
    maillot.style.backgroundPosition = 'center center';
    maillot.style.backgroundRepeat = 'no-repeat';
    maillot.style.overflow = "hidden"
    maillot.style.backgroundSize = "90%"


}

function setPlayer(player) {
    // Set the current team
    currentPlayer = player;
    // Display the inherited image on the face
    let head = document.querySelector('.head');
    head.style.backgroundImage = `url('${currentPlayer.img}')`;
    head.style.backgroundSize = 'cover';
    head.style.backgroundColor = 'transparent';
    head.style.backgroundPosition = 'center center';


}


const hitSound = document.getElementById('hitSound');
const goalSound = document.getElementById('goalSound');

function playHitSound() {
    hitSound.currentTime = 0;
    hitSound.play();
}
function playgoalSound() {
    goalSound.currentTime = 0;
    goalSound.play();
}


// --------------------------- GESTION D'ANIMATION DU JOUEUR------------------------------------

const player = document.querySelector('.player');
player.style.position = 'absolute';
player.style.left = '50%';


function movePlayer(direction) {
    const playerSpeed = 50;

    switch (direction) {
        case 'left':
            player.style.left = `${parseInt(player.style.left, 10) - playerSpeed}px`;
            break;
        case 'right':
            player.style.left = `${parseInt(player.style.left, 10) + playerSpeed}px`;
            break;
        // Add more cases for other directions if needed
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            movePlayer('left');
            break;
        case 'ArrowRight':
            movePlayer('right');
            break;
    }
});

// --------------------------- GESTION D'ANIMATION DE LA BALLE ------------------------------------

const ball = document.querySelector('.ball');

function launchBall(userVelocity = 1) {
    let initialVelocity = { dx: -4 , dy: -4 }; // Adjust direction of ball movement
    const initialPosition = { x: -40, y: 100 }; // (left and top CSS)
    let gravity = 0
    let position = { x: initialPosition.x, y: initialPosition.y };

    
    function updatePosition() {

        gravity += 0.1;

        // Adjust initial velocity based on velocity factor and user-supplied userVelocity
        const adjustedVelocity = {
            dx: initialVelocity.dx *  (1 * userVelocity*2),
            dy: initialVelocity.dy * (1 + userVelocity*2) + gravity,
        };
        // console.log(userVelocity);
        // console.log(gravity);
        position.x += adjustedVelocity.dx;
        position.y += adjustedVelocity.dy;
    
        // Update the ball position
        ball.style.left = `${position.x}px`;
        ball.style.top = `${position.y}px`;
    
        // Get the boundaries of the playground dynamically
        const playgroundRect = document.querySelector('.playground').getBoundingClientRect();
        const ballRect = document.querySelector('.ball').getBoundingClientRect();
        const playerRect = document.querySelector('.player').getBoundingClientRect();
        const filetRect = document.querySelector('.filet').getBoundingClientRect();
        const floorRect = document.querySelector('.floor').getBoundingClientRect();
        const decoRect = document.querySelector('.deco').getBoundingClientRect();
        const panierRect = document.querySelector('.panier').getBoundingClientRect();
        const deco2Rect = document.querySelector('.deco2').getBoundingClientRect();
        const player = document.querySelector('.player').getBoundingClientRect()
player.x
        // STOP ANIMATION AT CONDITION
        if (
            ballRect.x + ball.clientWidth > playgroundRect.right || 
            ballRect.x >= playerRect.x
        ) {
            console.log("animation stops here");
            clearInterval(animationInterval);// Stop the animation
    
            // Reset the ball to the correct initial position
            ball.style.left = `${initialPosition.x}px`;
            ball.style.top = `${initialPosition.y}px`;

            //TOP CONSTRAINT
        } else if (ballRect.y < playgroundRect.top ||
            ballRect.y <= decoRect.top && ballRect.left === decoRect.right){
            Bounce()
        playHitSound()

        //BOTTOM CONSTRAINT
        } else if (ballRect.y > playgroundRect.bottom - floorRect.height - ball.clientHeight) {
            Bounce()
            playHitSound()
            //LEFT CONSTRAINT 
        } else if (ballRect.x < playgroundRect.left ||
            ballRect.x <= panierRect.left + decoRect.width && 
            ballRect.x >= panierRect.left && 
            ballRect.y + 50>= panierRect.y 
            ||
            //contraintes de la barre jaune
            ballRect.left <= deco2Rect.right && 
            ballRect.right >= deco2Rect.right &&
            ballRect.bottom >= deco2Rect.top
            
            )
             { 
            console.log(ballRect.x)
            console.log(deco2Rect.right)
            console.log(deco2Rect.left)

            playHitSound()
            Bounce()     

            //GOAL CONSTRAINT
        } else if (
            ballRect.left >= filetRect.left &&
            ballRect.bottom >= filetRect.bottom &&
            ballRect.top <= filetRect.top &&
            ballRect.right <= filetRect.right             
        ){
            // console.log('filetRect.right is '+filetRect.right );
            // console.log('ballRect.right is '+ballRect.right);
            // console.log('filetRect.left is '+filetRect.left);
            // console.log('ballRect.left is'+ballRect.left  );
            // console.log('filetRect.bottom is '+filetRect.bottom);
            // console.log('ballRect.bottom is'+ballRect.bottom  );
            // console.log('filetRect.top is '+filetRect.top);
            // console.log('ballRect.top is'+ballRect.top  );


// --------------------------------- GOAL LOGIC ------------------------------------------

            if (!goalScored){
                console.log('Ball is inside the net');
                goal()
                goalScored = true;
                setTimeout(() => {
                    goalScored = false;
                    const goalMessage = document.querySelector('.goal-message');
                    goalMessage.style.backgroundColor = 'rgb(90, 90, 152)';
                }, 1000);
            }
        }
    }
    
    
    // Set up the animation loop
    const animationInterval = setInterval(updatePosition, 10);


let bounceCount = 0;
const maxBounces = 5; 

    function Bounce() {
    bounceCount++;
    console.log("bounceCount: "+bounceCount);
    if (bounceCount >= maxBounces) {
        // Stop the animation after reaching the maximum number of bounces
        clearInterval(animationInterval);
        ball.style.left = `${initialPosition.x}px`;
        ball.style.top = `${initialPosition.y}px`;
        console.log('Animation stopped.');
        return;
        } else {
            initialVelocity = { dx: 2, dy: -6 }; 

        }

    }       
}

// --------------------------------- END OF LAUNCHBALL FUNCTION ------------------------------------------



let score = 0
let goalScored = false;

function goal (){
    playgoalSound()
     score += 1;
     console.log("score is "+ score);
     const goalMessage = document.querySelector('.goal-message');
     goalMessage.textContent = `${score}`;
     goalMessage.style.backgroundColor = '#f4a460';
     const filet = document.querySelector('.filet');
    }




// --------------------------- GESTION DU TEMPS DE PRESSION DU CLIC ------------------------------------

let spaceKeyDownTime;
let spaceKeyUpTime;
let userVelocity;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !spaceKeyDownTime) {
        spaceKeyDownTime = new Date();
        const bar = document.querySelector('.bar')
        bar.style.width = `${userVelocity * 100}%`;

    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' && spaceKeyDownTime){
        spaceKeyUpTime = new Date ();
        const pressDuration = spaceKeyUpTime - spaceKeyDownTime;
        // Convert press duration to a factor for adjusting the velocity
         userVelocity = Math.min(1, pressDuration / 1000 ); // Maximum factor is 1
        console.log('space released. press duration:', pressDuration, 'ms');
        const bar = document.querySelector('.bar')
        bar.style.width = '0';
        launchBall(userVelocity);
        // Reset the variables for the next press
        spaceKeyDownTime = null;
        spaceKeyUpTime = null;
    }
})



// ---------------- GESTION D'ANIMATION DE LA BALLE AU CONTACT DU PANIER ----------------------------