const playingGames = [
    {
        title: "Final Fantasy X",
        image: "images/FFX.jpg",
        genre: "JRPG",
        platform: "PC"
    },
    {
        title: "Persona 5 Royal",
        image: "images/P5R.jpg",
        genre: "JRPG",
        platform: "PC"
    }
];

const playingCount = document.getElementById("playing-count");

if (playingCount !== null) {
    playingCount.textContent = playingGames.length;
}

const backlogGames = [
    {
        title: "Persona 3 Reload",
        image: "images/p3r.jpg",
        genre: "JRPG",
        platform: "PC"
    },
    {
        title: "Metaphor: ReFantazio",
        image: "images/metaphor.jpg",
        genre: "JRPG",
        platform: "PC"
    },
    {
        title: "FINAL FANTASY VII REMAKE INTERGRADE",
        image: "images/ff7remake.jpg",
        genre: "JRPG",
        platform: "PC"
    },
    {
        title: "FINAL FANTASY VII REBIRTH",
        image: "images/ffrebirth.jpg",
        genre: "JRPG",
        platform: "PC"
    }
];


const upcomingGames = [
    {
        title: "Persona 4 Revival",
        image: "images/p4r.jpg",
        releaseDate: "18/02/2027",
        sortDate: "2027-02-18"
    },
    {
        title: "Final Fantasy VII Revelation",
        image: "images/ff7revelation.jpeg",
        releaseDate: "08/04/2027",
        sortDate: "2027-04-08"
    },
    {
        title: "Persona 6",
        image: "images/persona6.jpg",
        releaseDate: "N/A",
        sortDate: null
    },
    {
        title: "The Expanse: Osiris Reborn",
        image: "images/expanse.jpg",
        releaseDate: "Q2 2027",
        sortDate: "2027-04-01"
    }
];

const backlogCount = document.getElementById("backlog-count");

if (backlogCount !== null) {
    backlogCount.textContent = backlogGames.length;
}

const upcomingCount = document.getElementById("upcoming-count");

if (upcomingCount !== null) {
    upcomingCount.textContent = upcomingGames.length;
}

function renderGameCards(games, listId) {

    const gameList = document.getElementById(listId);

   if (gameList !== null) {
    gameList.textContent = "";

    for (const game of games) {

            const card = document.createElement("li");
            card.className = "game-card";

            if (game.image) {
                const image = document.createElement("img");
                image.src = game.image;
                image.alt = game.title + " Cover";
                card.appendChild(image);
            }

            const title = document.createElement("h3");
            title.textContent = game.title;

            const details = document.createElement("p");

            if (game.releaseDate) {
                details.textContent = "Release: " + game.releaseDate;
            } else {
                details.textContent = game.genre + " · " + game.platform;
            }

            card.appendChild(title);
            card.appendChild(details);

            gameList.appendChild(card);
        }
    }
}

renderGameCards(playingGames, "playing-list");
renderGameCards(upcomingGames, "upcoming-list");

const backlogSort = document.getElementById("backlog-sort");
const backlogSearch = document.getElementById("backlog-search");
const noResults = document.getElementById("no-results");

function updateBacklog() {
    const searchTerm = backlogSearch.value.toLowerCase().trim();

    let filteredGames = backlogGames.filter(function(game) {
        return game.title.toLowerCase().includes(searchTerm);
    });

    if (backlogSort.value === "az") {
        filteredGames.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    }

    if (backlogSort.value === "za") {
        filteredGames.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });
    }

    renderGameCards(filteredGames, "backlog-list");

    noResults.hidden = filteredGames.length !== 0;
}

if (backlogSort !== null && backlogSearch !== null && noResults !== null) {
    backlogSort.addEventListener("change", updateBacklog);
    backlogSearch.addEventListener("input", updateBacklog);

    updateBacklog();
}


const upcomingSort = document.getElementById("upcoming-sort");

if (upcomingSort !== null) {
    upcomingSort.addEventListener("change", function() {
        const sortedGames = [...upcomingGames];

        if (upcomingSort.value === "az") {
            sortedGames.sort(function(a, b) {
                return a.title.localeCompare(b.title);
            });
        }

        if (upcomingSort.value === "date") {
            sortedGames.sort(function(a, b) {
                const dateA = a.sortDate ?? "9999-12-31";
                const dateB = b.sortDate ?? "9999-12-31";

                return dateA.localeCompare(dateB);
            });
        }

        renderGameCards(sortedGames, "upcoming-list");
    });
}
