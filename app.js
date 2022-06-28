const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector(".liste-poke");
const formRecherche = document.querySelector("form");
const chargement = document.querySelector(".loader");
let allPokemon = [];
let tableauFin = [];
const limit = 350;

const types = {
    grass: "#78c850",
    ground: "#e2bf65",
    dragon: "#6f35fc",
    fire: "#f58271",
    electric: "#f7d02c",
    fairy: "#d685ad",
    poison: "#966da3",
    bug: "#b3f594",
    water: "#6390f0",
    normal: "#d9d5d8",
    psychic: "#f95587",
    flying: "#a98ff3",
    fighting: "#c25956",
    rock: "#b6a136",
    ghost: "#735797",
    ice: "#96d9f6",
};

const fecthPokemenComplet = (pokemon) => {
    let objPokemenFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;

    fetch(url)
        .then((res) => res.json())
        .then((pokeData) => {
            // console.log(pokeData);
            objPokemenFull.pic = pokeData.sprites.front_default;
            objPokemenFull.type = pokeData.types[0].type.name;
            objPokemenFull.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then((res) => res.json())
                .then((pokeData) => {
                    // console.log(pokeData);
                    objPokemenFull.name = pokeData.names[4].name;
                    allPokemon.push(objPokemenFull);
                    if (allPokemon.length === limit) {
                        // console.log(allPokemon);
                        tableauFin = allPokemon
                            .sort((a, b) => {
                                return a.id - b.id;
                            })
                            .slice(0, 21);
                        // console.log(tableauFin);
                        createCard(tableauFin);
                        chargement.style.display = "none";
                    }
                });
        });
};
const fecthPokemenBase = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then((res) => res.json())
        .then((allPoke) => {
            // console.log(allPoke);
            allPoke.results.forEach((pokemon) => {
                fecthPokemenComplet(pokemon);
            });
        });
};
fecthPokemenBase();

// Création des cartes Pokémon

function createCard(arr) {
    for (const card of arr) {
        const carte = document.createElement("li");
        let couleur = types[card.type];
        carte.style.background = couleur;
        const txtCarte = document.createElement("h5");
        txtCarte.innerText = card.name;
        const idCarte = document.createElement("p");
        idCarte.innerText = `ID# ${card.id}`;
        const imgCarte = document.createElement("img");
        imgCarte.src = card.pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);
    }
}

// Scroll Infini

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // console.log(scrollTop, scrollHeight, clientHeight);
    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
});

let index = 21;

function addPoke(nb) {
    if (index > allPokemon.length) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Recherche

searchInput.addEventListener("keyup", recherche);

// formRecherche.addEventListener("submit", (e) => {
//     e.preventDefault();
//     recherche();
// });

function recherche() {
    if (index < allPokemon.length) {
        addPoke(130);
    }
    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll("li");
    allTitles = document.querySelectorAll("li > h5");

    for (i = 0; i < allLi.length; i++) {
        titleValue = allTitles[i].innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}

// Animation input

searchInput.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add("active-input");
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove("active-input");
    }
});
