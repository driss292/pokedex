const searchInput = document.querySelector(".recherche-poke input");
let allPokemon = [];
let tableauFin = [];

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

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then((res) => res.json())
                .then((pokeData) => {
                    // console.log(pokeData);
                    objPokemenFull.name = pokeData.names[4].name;
                    allPokemon.push(objPokemenFull);
                    if (allPokemon.length === 151) {
                        console.log(allPokemon);
                    }
                });
        });
};
const fecthPokemenBase = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((res) => res.json())
        .then((allPoke) => {
            // console.log(allPoke);
            allPoke.results.forEach((pokemon) => {
                fecthPokemenComplet(pokemon);
            });
        });
};
fecthPokemenBase();

// Animation input

searchInput.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add("active-input");
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove("active-input");
    }
});
