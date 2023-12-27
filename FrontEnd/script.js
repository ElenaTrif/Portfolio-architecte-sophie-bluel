/********Variables*******/
const gallery = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");

// Création de la div qui contient nos boutons
const categoryMenu = document.createElement("div");
categoryMenu.classList.add("category-menu");
portfolio.appendChild(categoryMenu);
categoryMenu.after(gallery);



// Fonction pour récupérer les travaux depuis l'API
async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json();
}

// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

// Fonction pour afficher les catégories dans la category-menu
async function displayCategories() {
    const categories = await fetchCategories();


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

// Vérifier si l'utilisateur est connecté
const userToken = window.sessionStorage.getItem("token");
const logoutButton = document.querySelector(".logout");

if (userToken) {
    // 1. Modifier le texte du bouton "login" à "logout"
    logoutButton.innerHTML = "logout";

    // 2. Ajouter la barre avec l'icône et le texte "Mode édition"
    const modeEditionBar = document.createElement("div");
    modeEditionBar.classList.add("mode-edition-bar");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-pen-to-square", "fa-regular");

    const modeEditionText = document.createElement("span");
    modeEditionText.textContent = "Mode édition";

    modeEditionBar.appendChild(icon);
    modeEditionBar.appendChild(document.createTextNode(" ")); // Ajouter un espace entre l'icône et le texte
    modeEditionBar.appendChild(modeEditionText);
    modeEditionBar.style.backgroundColor = "black";
    modeEditionBar.style.height = "40px";
    modeEditionText.style.color = "white";
    icon.style.color = "white";
    modeEditionBar.style.textAlign = "center";
    modeEditionBar.style.paddingTop = "20px";

    document.body.prepend(modeEditionBar);

    // 3. Supprimer les boutons de filtres par catégories
    const categoryMenu = document.querySelector(".category-menu");
    if (categoryMenu) {
        categoryMenu.remove();
    }

    // 4. Ajouter l'icône et le texte "modifier" à côté de "Mes projets"
    const mesProjetsText = document.querySelector(".projetsModifier");

    const modifierIcon = document.createElement("i");
    modifierIcon.classList.add("fas", "fa-pen-to-square", "fa-regular");
    modifierIcon.style.color = "black"; // Couleur du texte
    modifierIcon.style.fontSize = "18px"; // Taille de police plus petite

    const modifierText = document.createElement("span");
    modifierText.classList.add("modifierText");
    modifierText.style.cursor = "pointer";
    modifierText.textContent = "modifier";
    modifierText.style.color = "black"; // Couleur du texte
    modifierText.style.fontSize = "18px"; // Taille de police plus petite

    mesProjetsText.appendChild(document.createTextNode(" ")); // Ajouter un espace entre l'icône et le texte
    mesProjetsText.appendChild(modifierIcon);
    mesProjetsText.appendChild(document.createTextNode(" ")); // Ajouter un espace entre l'icône et le texte
    mesProjetsText.appendChild(modifierText);

    // Modifier le style du curseur pour le bouton "logout"
    logoutButton.style.cursor = "pointer";


}

// Ajouter l'écouteur d'événement click sur le bouton "logout"
logoutButton.addEventListener("click", () => {

    // Se déconnecter en supprimant le token de la session
    window.sessionStorage.removeItem("token");

    // Recharger la page pour revenir à l'état initial
    window.location.href = "index.html";
});

// Appeler la fonction pour afficher les catégories au chargement de la page
displayCategories();
displayWorks(); // Afficher tous les travaux par défaut




// Script pour gérer l'ouverture et la fermeture de la fenêtre modale

// Sélection des éléments du DOM
const modifier = document.querySelector(".projetsModifier");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".fa-xmark");

// Gestionnaire d'événement pour ouvrir la modale
modifier.addEventListener("click", () => {
    modal.classList.add("show");
});

// Gestionnaire d'événement pour fermer la modale
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Gestionnaire d'événement pour fermer la modale en cliquant en dehors de celle-ci
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// Déclaration des variables de la modale
const modalGallery = document.querySelector(".modalGallery");

// Affichage de la galerie dans la modale
async function displayWorksModal() {
    modalGallery.innerHTML = "";
    const worksModal = await fetchWorks();
    worksModal.forEach((work)=> {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid","fa-trash-can");
        figure.classList.add("imageModal");
        trash.id = work.id;

        img.src = work.imageUrl;

        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);

        modalGallery.appendChild(figure);
    });
}

displayWorksModal()

