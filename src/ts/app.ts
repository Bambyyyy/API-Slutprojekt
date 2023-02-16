// ============ API- & DOM-Stuff ============
const apiKey = "api_key=12345678901234567890123456789012"; // <<< Enter your own API-key here!
const baseUrl = "https://api.themoviedb.org/3";
const basUrl = "https://api.themoviedb.org/3/search/";

const imageUrl = "https://image.tmdb.org/t/p/w500/";
const standardUrl =
  baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const apiSearch =
  "http://api.themoviedb.org/3/search/movie?" +
  apiKey +
  "&language=en-US&query=";

const showCards = document.getElementById("show-cards") as HTMLDivElement;
const searchField = document.getElementById("search-movie") as HTMLInputElement;
const searchButton = document.getElementById(
  "search-button"
) as HTMLButtonElement;
const main = document.getElementById("main") as any;
const startpage = document.getElementById("start-page") as HTMLParagraphElement;
const chooseCategory = document.getElementById(
  "choose-category"
) as HTMLSelectElement;

const showWatchlist = document.getElementById(
  "watchlist"
) as HTMLParagraphElement;

// ============ API- & DOM-Stuff ============

// ============ Serie and Movie type cards you get from the API ============

type serieCard = {
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  imageUrl: { poster_path: string };
  name: string;
  overview: string;
  id: number;
};

type movieCard = {
  release_date: string;
  vote_average: number;
  poster_path: string;
  imageUrl: { poster_path: string };
  title: string;
  overview: string;
  id: number;
};

type newCard = serieCard & movieCard;

let watchlist: newCard[] = [];

// ============ Serie and Movie type cards you get from the API ============

// ============ Start page with most popular movies/series ============

getMovies(standardUrl);

async function getMovies(url: RequestInfo | URL) {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.results);
  printCardMovies(data);
}

// ============ Start page with most popular movies/series ============

// ============ Prints movie cards you've searched for ============

function printCardMovies(data: any) {
  data.results.forEach((result: movieCard) => {
    let newArcticle = document.createElement("article");
    newArcticle.setAttribute("class", "movie-card");
    newArcticle.innerHTML = `
      <img class="movie-img" src="${
        result.poster_path
          ? imageUrl + result.poster_path
          : "../noPosterAvailable.jpg"
      }"/>
      <div class="movie-info">
      <h3 class="movie-title">${result.title} (${
      result.release_date ? result.release_date.slice(0, -6) : "0"
    })</h3>
          <span class="${getColor(result.vote_average)}">${roundNumber(
      result.vote_average
    )}</span>
          </div>`;

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "overview");
    newDiv.innerHTML = `${showDescription(result.overview)}`;
    let newButton = document.createElement("button");
    newButton.innerHTML = "Add to watchlist";

    let movie = watchlist.find((element: newCard) => element.id === result.id);

    if (movie === undefined) {
      newButton.disabled = false;
    } else {
      newButton.disabled = true;
    }

    newButton.addEventListener("click", function (event) {
      event.preventDefault();
      const newResult = result as newCard;
      watchlist.push(newResult);
      this.disabled = true;
    });
    newDiv.append(newButton);
    newArcticle.append(newDiv);
    showCards.append(newArcticle);
  });
}

// ============ Prints movie cards you've searched for ============

// ============ Prints serie cards you've searched for ============

function printcardSeries(data: any) {
  data.results.forEach((result: serieCard) => {
    let newArcticle = document.createElement("article");
    newArcticle.setAttribute("class", "movie-card");
    newArcticle.innerHTML = `
      <img class="movie-img" src="${
        result.poster_path
          ? imageUrl + result.poster_path
          : "../noPosterAvailable.jpg"
      }"/>
      <div class="movie-info">
      <h3 class="movie-title">${result.name} (${
      result.first_air_date ? result.first_air_date.slice(0, -6) : "0"
    })</h3>
          <span class="${getColor(result.vote_average)}">${roundNumber(
      result.vote_average
    )}</span>
          </div>`;

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "overview");
    newDiv.innerHTML = `${showDescription(result.overview)}`;
    let newButton = document.createElement("button");
    newButton.innerHTML = "Add to watchlist";
    let serie = watchlist.find((element: newCard) => {
      if (element.id) {
        return element.id === result.id;
      } else return false;
    });

    if (serie === undefined) {
      newButton.disabled = false;
    } else {
      newButton.disabled = true;
    }

    newButton.addEventListener("click", function (event) {
      event.preventDefault();
      const newResult = result as newCard;
      watchlist.push(newResult);
      this.disabled = true;
    });
    newDiv.append(newButton);
    newArcticle.append(newDiv);
    showCards.append(newArcticle);
  });
}

// ============ Prints serie cards you've searched for ============

// ============ Goes to your watchlist and showing movies/series you've added ============

showWatchlist.addEventListener("click", function (event) {
  event.preventDefault();
  showCards.innerHTML = "";
  showWatchlistCards();
});

let showWatchlistCards = function () {
  showCards.innerHTML = "";

  let length = watchlist.length;
  for (let i = 0; i < length; i++) {
    let newArcticle = document.createElement("article");
    newArcticle.setAttribute("class", "movie-card");
    newArcticle.innerHTML = `
      <img class="movie-img" src="${
        watchlist[i].poster_path
          ? imageUrl + watchlist[i].poster_path
          : "../noPoster.jpg"
      }"/>
      <div class="movie-info">
      <h3 class="movie-title">${
        watchlist[i].name ? watchlist[i].name : watchlist[i].title
      } (${
      watchlist[i].first_air_date
        ? watchlist[i].first_air_date.slice(0, -6)
        : watchlist[i].release_date
        ? watchlist[i].release_date.slice(0, -6)
        : "0"
    })</h3>
          <span class="${getColor(watchlist[i].vote_average)}">${
      watchlist[i].vote_average
    }</span>
          </div>`;

    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "overview");
    newDiv.innerHTML = `${showDescription(watchlist[i].overview)}`;
    let newButton = document.createElement("button");
    newButton.innerHTML = "Remove from watchlist";
    newButton.setAttribute("class", `${watchlist[i].id} removeButton`);
    newButton.addEventListener("click", function (event) {
      event.preventDefault();
      const index = watchlist.indexOf(watchlist[i], 0);
      if (index > -1) {
        watchlist.splice(index, 1);
      }
      showWatchlistCards();
    });
    newDiv.append(newButton);
    newArcticle.append(newDiv);
    showCards.append(newArcticle);
  }
  searchField.value = "";
};

// ============ Goes to your watchlist and showing movies/series you've added ============

// ============ Basic functions for the printcardMoviess ============

// === Alternate description if none is available ===

function showDescription(value: any) {
  if (value == "") {
    return "There is no description for this serie yet";
  } else {
    return value;
  }
}

// === Alternate description if none is available ===

// === Showing series or movies value when the search is not found ===

function showType(value: any) {
  if (value == "tv") {
    return "series";
  } else {
    return value;
  }
}

// === Showing series or movies value when the search is not found ===

// === Round down viewer rating to one decimal ===

function roundNumber(value: any) {
  if (value > 0) {
    return (value = value.toFixed(1));
  } else {
    return value;
  }
}

// === Round down viewer rating to one decimal ===

// === Get color depending on rating ===

function getColor(vote: number) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else if (vote >= 1) {
    return "red";
  } else {
    return "black";
  }
}

// === Get color depending on rating ===

// ============ Basic functions for the printcardMoviess ============

// ============ Search with Click ============

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  showCards.innerHTML = "";
  const choosenCategory =
    basUrl +
    chooseCategory.value +
    "?" +
    apiKey +
    "&language=en-US&query=" +
    searchField.value;

  const response = await fetch(choosenCategory);
  const data = await response.json();

  if (searchField.value == "") {
    const resultHTML = `<h3 class="nothing-found";>No ${showType(
      chooseCategory.value
    )} found, try again!😊</h3>`;
    showCards.insertAdjacentHTML("beforeend", resultHTML);
  } else if (data.results.length === 0) {
    const resultHTML = `<h3 class="nothing-found";>No ${showType(
      chooseCategory.value
    )} found named ${searchField.value}, try again!😊</h3>`;
    showCards.insertAdjacentHTML("beforeend", resultHTML);
  } else {
    if (chooseCategory.value === "movie") {
      printCardMovies(data);
    } else {
      printcardSeries(data);
    }
  }
  searchField.value = "";
});

// ============ Search with Click ============

// ============ Search with Enter-key ============

searchField.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    showCards.innerHTML = "";
    const choosenCategory =
      basUrl +
      chooseCategory.value +
      "?" +
      apiKey +
      "&language=en-US&query=" +
      searchField.value;

    const response = await fetch(choosenCategory);
    const data = await response.json();

    if (searchField.value == "") {
      const resultHTML = `<h3 class="nothing-found";>No ${showType(
        chooseCategory.value
      )} found, try again!😊</h3>`;
      showCards.insertAdjacentHTML("beforeend", resultHTML);
    } else if (data.results.length === 0) {
      const resultHTML = `<h3 class="nothing-found";>No ${showType(
        chooseCategory.value
      )} found named ${searchField.value}, try again!😊</h3>`;
      showCards.insertAdjacentHTML("beforeend", resultHTML);
    } else {
      if (chooseCategory.value === "movie") {
        printCardMovies(data);
      } else {
        printcardSeries(data);
      }
    }
    searchField.value = "";
  }
});
// ============ Search with Enter-key ============

// ============ Go back to startpage ============

startpage.addEventListener("click", (event) => {
  showCards.innerHTML = "";
  searchField.value = "";
  getMovies(standardUrl);
});

// ============ Go back to startpage ============
