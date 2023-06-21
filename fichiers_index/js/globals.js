
// Nombre d'apparition de post simultané
const nbPostLimit = 3;  

// Intervalle entre les apparition de post
const timeInSec = 3;  

// Nombre maximum de post affiché
const nbPostMax = 30;   

// Pour créé des timeout qui pourront être annulés
let timeout; 

// Conteneur principale pour affichage posts HTML
const postsContainer = document.getElementById('posts-container');

// Conteneur principale pour affichage café HTML
const coffeesContainer = document.getElementById('coffees-container');

const userContainer = document.getElementById('user-container');