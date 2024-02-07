// document.addEventListener('DOMContentLoaded', () => {
//     const playground = document.querySelector('.playground');
    
//     // Create 100 people and append them to the playground
//     for (let i = 0; i < 100; i++) {
//       const person = createPerson();
//       playground.appendChild(person);
//     }
    
//     // Animate the arms of each person
//     setInterval(() => {
//       const people = document.querySelectorAll('.person');
//       people.forEach(person => {
//         animateArms(person);
//       });
//     }, 500);
//   });
  
//   function createPerson() {
//     const person = document.createElement('div');
//     person.className = 'person';
//     person.style.left = `${getRandomPosition()}px`;
//     person.style.top = `${getRandomPosition()}px`;
  
//     const leftArm = createArm();
//     const rightArm = createArm();
//     person.appendChild(leftArm);
//     person.appendChild(rightArm);
  
//     return person;
//   }
  
//   function createArm() {
//     const arm = document.createElement('div');
//     arm.className = 'arm';
//     return arm;
//   }
  
//   function getRandomPosition() {
//     return Math.floor(Math.random() * window.innerWidth);
//   }
  
//   function animateArms(person) {
//     const arms = person.querySelectorAll('.arm');
//     arms.forEach(arm => {
//       const translateY = Math.random() > 0.5 ? '5px' : '-5px';
//       arm.style.transform = `translateY(${translateY})`;
//     });
//   }
  