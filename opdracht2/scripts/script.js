/* alle radio buttons opzoeken */
// const optionAll = document.querySelector("#filter-all");
// const optionActie = document.querySelector("#filter-actie");
// const optionComedy = document.querySelector("#filter-comedy");
// const optionHorror = document.querySelector("#filter-horror");

const allMovies = document.querySelectorAll("main ul li");

const filters = document.querySelectorAll("header aside input");

const toggleContainer = document.querySelector("div.btn");
const savedMovieContainer = document.querySelector("section");
const savedMovieList = document.querySelector("section ul");

const favoriteButton = document.querySelectorAll("ul:first-of-type li button");


function filterList(event){
  for(let i=0; i<allMovies.length; i++) {
  allMovies[i].classList.remove("zichtbaar");
  }

  // page load geeft als event undefined
  if(event == undefined || event.target.value == "all") {
    for(let i=0; i<allMovies.length; i++) {
      allMovies[i].classList.add("zichtbaar");
      }
      return;
  }

  // zoek alle li elementen met de class van de gekozen value
  const movieOptions = document.querySelectorAll("." + event.target.value);



  for(let i=0; i<movieOptions.length; i++) {
    movieOptions[i].classList.add("zichtbaar");
  }


  // const deLijst = document.querySelector("ul");
  // const nieuweFilter = event.target.value;
  // // verwijder de huidige class van de lijst
  // deLijst.className = "";

  // // de value van die radio button is de nieuwe class
  // deLijst.classList.add(nieuweFilter);
}

filterList();


// sla film op, innerHTML wordt gedupliceerd
function saveMovie(event) {
  const filmHTML = event.target.parentNode.innerHTML;

  const liElement = document.createElement("li");
  // classlist voor aparte style opggeslagen film
  liElement.classList.add("favoriet");
  liElement.innerHTML = filmHTML;

  // voeg film toe aan "opgeslagen" filmlijst
  savedMovieList.appendChild(liElement);





// update film favoriet knoppen en eventlisteners
  const removeFavoriteButton = document.querySelectorAll("section ul li button");

  for (let i=0; i<removeFavoriteButton.length; i++) {
    removeFavoriteButton[i].addEventListener("click", removeMovie);
  }
}

function removeMovie(event){
  event.target.parentNode.remove();
}



for (let i=0; i<favoriteButton.length; i++) {
  favoriteButton[i].addEventListener("click", saveMovie);
}

// function menu
function slide() {
  savedMovieContainer.classList.toggle("showmenu");
}

toggleContainer.addEventListener("click", slide);

for (let i=0; i<filters.length; i++) {
  filters[i].addEventListener("click", filterList);
}