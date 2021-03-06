///////////////////////////////////
///////////////////////////////////
//////////alle constanten//////////
///////////////////////////////////
///////////////////////////////////
const bodyElement = document.querySelector("body");
const rootElement = document.querySelector(":root");

const darkModeToggle = document.querySelector("body header>button");
let currentTheme = localStorage.getItem("currentTheme");

const allMovies = document.querySelectorAll("main ul li");

const filters = document.querySelectorAll("header aside input");

const toggleContainerButton = document.querySelector("section:last-of-type button");
const savedMovieList = document.querySelector("section:last-of-type ul");

const favoriteButton = document.querySelectorAll("ul:first-of-type li button");

const favoriteCounter = document.querySelector("section:last-of-type p span");
const noFavMessage = document.querySelector("section:last-of-type>p");



///////////////////////////////////
///////////////////////////////////
////////alle films inladen/////////
///////////////////////////////////
///////////////////////////////////
function filterList(event) {
  //alle movies onzichtbaar
  for (let i = 0; i < allMovies.length; i++) {
    allMovies[i].classList.remove("zichtbaar");
  }

  // page load geeft als event undefined
  // alle films worden zichtbaar, zowel op page load en als er wordt gefilterd op "all"
  if (event == undefined || event.target.value == "all") {
    for (let i = 0; i < allMovies.length; i++) {
      allMovies[i].classList.add("zichtbaar");
    }
    return;
  }

  // zoek alle li elementen met de class van de gekozen value
  const movieOptions = document.querySelectorAll("." + event.target.value);

  // maak al die li elementen zichtbaar
  for (let i = 0; i < movieOptions.length; i++) {
    movieOptions[i].classList.add("zichtbaar");
  }
}

filterList();


///////////////////////////////////
///////////////////////////////////
////film opslaan en verwijderen////
///////////////////////////////////
///////////////////////////////////  
// sla film op, innerHTML van de li wordt gedupliceerd
function saveMovie(event) {
  // li element wordt opgeslagen
  const filmHTML = event.currentTarget.parentNode;

  // als het li element al favoriet is, zoek dan het geclonede element in de favorieten popup en verwijder die, daarna "favoriet" class weghalen
  if (filmHTML.classList.contains("favoriet")) {
    document.querySelector("section:last-of-type ul li." + filmHTML.classList[0]).remove();
    filmHTML.classList.remove("favoriet");
    //parseInt() om tekst uit favoriet counter als number te krijgen
    favoriteCounter.textContent = parseInt(favoriteCounter.textContent) - 1;
    if (favoriteCounter.textContent == 0) {
      noFavMessage.classList.add("geenfavo");
    }
    return;
  }

  filmHTML.classList.add("favoriet");

  //clone li element naar favorieten popup, voeg class toe zodat deze later terug kan worden gevonden
  const liElement = document.createElement("li");
  liElement.classList.add(event.currentTarget.parentNode.classList[0]);
  liElement.innerHTML = filmHTML.innerHTML;

  // voeg film toe aan "opgeslagen" filmlijst
  savedMovieList.appendChild(liElement);

  // update film favoriet knoppen en eventlisteners
  const removeFavoriteButton = document.querySelectorAll("section ul li button");

  favoriteCounter.textContent = parseInt(favoriteCounter.textContent) + 1;

  noFavMessage.classList.remove("geenfavo");

  for (let i = 0; i < removeFavoriteButton.length; i++) {
    removeFavoriteButton[i].addEventListener("click", removeMovie);
  }
}

function removeMovie(event) {
  //verwijder html van film uit favorieten lijst
  event.currentTarget.parentNode.remove();
  favoriteCounter.textContent = parseInt(favoriteCounter.textContent) - 1;
  if (favoriteCounter.textContent == 0) {
    noFavMessage.classList.add("geenfavo");
  }

  //haalt hartje weg uit main lijst met films
  document.querySelector("main ul li." + event.currentTarget.parentNode.classList).classList.remove("favoriet");
}

// favorieten popup toggle
function togglePopup() {
  bodyElement.classList.toggle("showmenu");
}


///////////////////////////////////
///////////////////////////////////
////////function darkmode//////////
///////////////////////////////////
///////////////////////////////////
function toggleDarkMode(event) {
  //pagina load geeft als event undefined, alleen dan kijken naar localstorage
  if (event == undefined) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches && currentTheme == null) {
      rootElement.classList.add("darkmode");
      darkModeToggle.textContent = "Lightmode";
    } else if (currentTheme == "dark") {
      rootElement.classList.add("darkmode");
      darkModeToggle.textContent = "Lightmode";
    }
    return;
  }

  //kijk of de button geklikt is
  if (event.target.tagName == "BUTTON") {
    rootElement.classList.toggle("darkmode");

    //als de event.target.tagName niet "BUTTON" is, is de event dat systeemvoorkeur veranderd
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    rootElement.classList.remove("darkmode");
  } else {
    rootElement.classList.add("darkmode");
  }

  //localstorage
  if (rootElement.classList.contains("darkmode")) {
    localStorage.setItem("currentTheme", "dark");
    darkModeToggle.textContent = "Lightmode";
  } else {
    localStorage.setItem("currentTheme", "light");
    darkModeToggle.textContent = "Darkmode";
  }
}

toggleDarkMode();



for (let i = 0; i < favoriteButton.length; i++) {
  favoriteButton[i].addEventListener("click", saveMovie);
}

toggleContainerButton.addEventListener("click", togglePopup);

darkModeToggle.addEventListener("click", toggleDarkMode);
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", toggleDarkMode);

for (let i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", filterList);
}