const searchInput = document.querySelector(".recherche-poke input");
// Animation input

searchInput.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add("active-input");
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove("active-input");
    }
});
