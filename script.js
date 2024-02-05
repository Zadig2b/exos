import { Team, Player } from './team.js';

// --------------------------- GESTION DES ELEMENTS DU DOM ET CLASSES ------------------------------------


// Create player instances
const spursPlayer = new Player("Devin Vassel", "devin_image.jpg", "Skill level 1");
const sixersPlayer = new Player("Joel Embiid", "joel_image.jpg", "Skill level 2");
const bullsPlayer = new Player("DeMar", "demar_image.jpg", "Skill level 3");

// Create team instances with corresponding players
const spursTeam = new Team(2, "Spurs", "./res/Spurs/spurs.png", spursPlayer);
const sixersTeam = new Team(1, "76ers", "./res/76ers/76ers2.svg", sixersPlayer);
const bullsTeam = new Team(1, "Bulls", "./res/Bulls/Bulls_de_Chicago_logo.svg", bullsPlayer);

// var test = document.getElementById('test');
// var img = test.createElement('img');
// img = spursTeam.img

function getImage(){
    return Player.img
}

getImage()


function setImage(){
    document.getElementById('team-img 1').src = spursTeam.img;
    document.getElementById('team-img 2').src = sixersTeam.img;
    document.getElementById('team-img 3').src = bullsTeam.img;
}

setImage()

console.log(spursTeam);
console.log(spursPlayer);


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

function launchBall(velocityFactor) {
    let initialVelocity = { dx: -4 * velocityFactor, dy: -4 * velocityFactor}; // Adjust direction of ball movement
    const initialPosition = { x: -40, y: -20 }; // (left and top CSS)
    let position = { x: initialPosition.x, y: initialPosition.y };

    
    function updatePosition() {
        position.x += initialVelocity.dx;
        position.y += initialVelocity.dy;
    
        // Update the ball position
        ball.style.left = `${position.x}px`;
        ball.style.top = `${position.y}px`;
    
        // Get the boundaries of the playground dynamically
        const playgroundRect = document.querySelector('.playground').getBoundingClientRect();
        const ballRect = document.querySelector('.ball').getBoundingClientRect();
        const playerRect = document.querySelector('.player').getBoundingClientRect();
        const filetRect = document.querySelector('.filet').getBoundingClientRect();
        const floorRect = document.querySelector('.floor').getBoundingClientRect();
        // console.log(ballRect, "ballRect");

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
        } else if (ballRect.y < playgroundRect.top){
        initialVelocity = { dx: -2, dy: 2 }; 
        //BOTTOM CONSTRAINT
        } else if (ballRect.y > playgroundRect.bottom - floorRect.height - ball.clientHeight) {
            initialVelocity = { dx: 2, dy: -2 }; 
            //LEFT CONSTRAINT
        } else if (ballRect.x < playgroundRect.left) {
            initialVelocity = { dx: 2, dy: 2 }; 
            //GOAL CONSTRAINT
        } else if (
            ballRect.left >= filetRect.left &&
            ballRect.bottom === filetRect.bottom &&
            ballRect.right <= filetRect.right             
        ){
            console.log('filetRect.right is '+filetRect.right );
            console.log('ballRect.right is '+ballRect.right);
            console.log('filetRect.left is '+filetRect.left);
            console.log('ballRect.left is'+ballRect.left  );
            console.log('filetRect.bottom is '+filetRect.bottom);
            console.log('ballRect.bottom is'+ballRect.bottom  );


            if (!goalScored){
                console.log('Ball is inside the net');
                goal()
                goalScored = true;

                setTimeout(() => {
                    goalScored = false;
                }, 3000);
            }
        }
    }
    
    

    // Set up the animation loop
    const animationInterval = setInterval(updatePosition, 10);
}
let animationInterval;
let score = 0
let goalScored = false;
function goal (){
     score += 1;
     console.log("score is "+ score);
}


let bounceCount = 0;
const maxBounces = 5; 

function Bounce() {
    bounceCount++;

    if (bounceCount > maxBounces) {
        // Stop the animation after reaching the maximum number of bounces
        clearInterval(animationInterval);
        console.log('Animation stopped.');
        return;
    }

    // Decrease bouncing by 20% for each bounce
    const bounceFactor = 1 - (0.2 * bounceCount);

    // Get the boundaries of the playground dynamically
    const playgroundRect = document.querySelector('.playground').getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    // Update the ball position with reduced bouncing
    const newY = playgroundRect.top - (ball.clientHeight * bounceFactor);
    ball.style.top = `${newY}px`;

    console.log(`Bounce ${bounceCount}: Ball position updated to ${newY}px`);
}

// --------------------------- GESTION DU TEMPS DE PRESSION DU CLIC ------------------------------------

let spaceKeyDownTime;
let spaceKeyUpTime;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !spaceKeyDownTime) {
        spaceKeyDownTime = new Date();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' && spaceKeyDownTime){
        spaceKeyUpTime = new Date ();
        const pressDuration = spaceKeyUpTime - spaceKeyDownTime;

        // Convert press duration to a factor for adjusting the velocity
        const velocityFactor = Math.min(1, pressDuration / 1000); // Maximum factor is 1    }
        console.log('space released. press duration:', pressDuration, 'ms');

        launchBall(velocityFactor);
        // Reset the variables for the next press
        spaceKeyDownTime = null;
        spaceKeyUpTime = null;
    }
})


// ---------------- GESTION D'ANIMATION DE LA BALLE AU CONTACT DU PANIER ----------------------------








function displayTeams(){

}
class floor {

}




class character {
    name;
    model;
    skill;

    constructor(){
        this.name = this.name
    }
} 