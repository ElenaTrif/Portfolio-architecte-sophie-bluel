/********Variables*******/
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");

// Création de la div qui contient nos boutons
const categoryMenu = document.createElement("div");
    categoryMenu.classList.add("category-menu");
    portfolio.appendChild(categoryMenu);
    categoryMenu.after(gallery);
    console.log(categoryMenu)


// Fonction pour récupérer les traveaux depuis l'API
async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json();
}
fetchWorks();



// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

fetchCategories()

// Fonction pour afficher les catégories dans la category-menu
async function displayCategories() {
    const categories = await fetchCategories();
    const categoryMenu = document.querySelector(".category-menu");
    
    // Création du bouton "Tous"
    const allOption = document.createElement("button");
    allOption.textContent = "Tous";
    allOption.addEventListener("click", () => filterWorks());
    categoryMenu.appendChild(allOption);

    // Création des boutons selon le nombre de catégories
    categories.forEach((category) => {
        const categoryItem = document.createElement("button");
        categoryItem.textContent = category.name;
        categoryItem.addEventListener("click", () => filterWorks(category.id));
        categoryMenu.appendChild(categoryItem);
    });
}


// Fonction pour afficher les travaux dans la galerie
async function displayWorks(categoryId) {
    const listWorks = await fetchWorks();
    const gallery = document.querySelector(".gallery");

    // Supprimer les travaux du HTML déjà présents
    gallery.innerHTML = "";

    // Filtrer les travaux par catégorie si un filtre est spécifié
    const filteredWorks = categoryId
        ? listWorks.filter((work) => work.categoryId === categoryId)
        : listWorks;

    // Ajouter dynamiquement les travaux
    filteredWorks.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}


// Fonction de filtrage des travaux par catégorie
function filterWorks(categoryId) {
    displayWorks(categoryId);
}


// Appeler la fonction pour afficher les catégories au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    displayWorks(); // Afficher tous les travaux par défaut
});