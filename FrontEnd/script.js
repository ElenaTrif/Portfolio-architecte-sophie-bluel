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




// L'ouverture et la fermeture de la fenêtre modale

// Sélection des éléments du DOM pour les modaux
const modifier = document.querySelector(".projetsModifier");
const modal = document.getElementById("modal");
const closeModal1 = document.querySelector(".fa-xmark");
const closeModal2 = document.querySelector(".modal-2 span .fa-xmark");


const modal1 = document.querySelector('.modal-1');
const modal2 = document.querySelector('.modal-2');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const arrowLeftIcon = document.querySelector('.modal-2 .arrow-left');

// Gestionnaire d'événement pour ouvrir la modale
modifier.addEventListener("click", () => {
    modal.style.visibility = "visible";
    modal1.style.display = "flex";
    modal2.style.display = "none";
});

// Gestionnaire d'événement pour fermer la modale
closeModal1.addEventListener("click", () => {
    modal.style.visibility = "hidden";
});

closeModal2.addEventListener("click", () => {
    modal.style.visibility = "hidden";
});

// Gestionnaire d'événement pour fermer la modale en cliquant en dehors de celle-ci
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.visibility = "hidden";
    }
});

// Déclaration des variables de la modale
const modalGallery = document.querySelector(".modalGallery");

// Affichage de la galerie dans la modale
async function displayWorksModal() {
    modalGallery.innerHTML = "";
    const worksModal = await fetchWorks();
    worksModal.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        figure.classList.add("imageModal");
        trash.id = work.id;
        img.src = work.imageUrl;

        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);

        modalGallery.appendChild(figure);

        trash.style.cursor = "pointer";
    });
    deleteWorks();
}

displayWorksModal()

function deleteWorks() {
    // Sélection de tous les éléments du DOM avec la classe "fa-trash-can"
    const trashAll = document.querySelectorAll(".fa-trash-can");

    // Pour chaque élément sélectionné
    trashAll.forEach((trash) => {
        // Ajout d'un gestionnaire d'événements au clic sur l'icône de corbeille
        trash.addEventListener("click", (e) => {
            // Récupération de l'identifiant unique du travail à supprimer (correspondant à l'ID dans la base de données)
            const trashId = trash.id;

            // Création d'un objet de configuration pour la requête DELETE
            const deleteId = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${userToken}`, // Ajout du token d'authentification dans les en-têtes
                    "content-Type": "application/json", // Définition du type de contenu de la requête
                },
            };

            // Envoi de la requête DELETE au backend pour supprimer le travail dans la base de données
            fetch("http://localhost:5678/api/works/" + trashId, deleteId)
                .then((response) => {
                    // Vérification si la suppression a réussi
                    if (!response.ok) {
                        console.log("delete failed !");
                        throw new Error("Delete failed"); // Gestion des erreurs
                    }
                    return response.json(); // Renvoie la réponse JSON du backend
                })
                .then((data) => {
                    console.log("delete success, data :", data);

                    // Supprimer l'élément du DOM correspondant à l'ID du travail supprimé, sans rechargement
                    const deletedWork = document.getElementById(trashId);
                    if (deletedWork) {
                        deletedWork.remove();
                    }
                })
                .catch((error) => {
                    console.error("Error during deletion:", error);
                });
        });
    });
}


// Fonction pour afficher le modal-2 et masquer le modal-1
function showAddPhotoModal() {
    modal1.style.display = 'none';
    modal2.style.display = 'block';
    modal1.classList.add('hidden');
    modal2.classList.remove('hidden');
}

// Fonction pour afficher le modal-1 et masquer le modal-2
function showGalleryModal() {
    modal1.style.display = 'block';
    modal2.style.display = 'none';
    modal1.classList.remove('hidden');
    modal2.classList.add('hidden');
}

// Ajoutez un écouteur d'événements au bouton "Ajouter une photo"
addPhotoBtn.addEventListener('click', showAddPhotoModal);

// Ajoutez un écouteur d'événements à l'icône "arrow-left"
arrowLeftIcon.addEventListener('click', showGalleryModal);







// Ajouter un écouteur d'événements au formulaire pour gérer l'ajout de nouveaux projets
const formAjouterPhoto = document.getElementById("formAjouterPhoto");
formAjouterPhoto.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Récupérer les valeurs du formulaire
    const title = document.getElementById("title").value;
    const category = document.getElementById("categoryInput").value;

    // Vérifier si une image est sélectionnée
    const selectedFile = document.getElementById("file").files[0];
    if (!selectedFile) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("category", category);

    // Envoyer la requête POST au backend pour ajouter un nouveau projet
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${userToken}`, // Ajouter le token d'authentification
        },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du projet.");
            }
            return response.json();
        })
        .then((data) => {
            // Afficher un message de succès
            console.log("Projet ajouté avec succès.", data);

            // Actualiser dynamiquement le DOM pour afficher le nouveau projet
            displayWorks(); // Ceci mettra à jour la galerie avec le nouveau projet
            displayWorksModal(); // Ceci mettra à jour la galerie dans la modale
        })
        .catch((error) => {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite lors de l'ajout du projet.");
        });
});


// Ajouter la fonction pour charger les catégories au chargement de la page
async function loadCategories() {
    const categories = await fetchCategories();

    // Sélectionner le menu des catégories
    const categoryMenu = document.getElementById("categoryInput");

    // Ajouter dynamiquement les options de catégorie
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categoryMenu.appendChild(option);
    });
}

loadCategories();



//fonction prévisualisation de l'image
const inputFile = document.querySelector("#file");
function prevImg() {
    inputFile.addEventListener("change", () => {
        const file = inputFile.files[0];
        // console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
                // labelFile.style.display ="none"
                // paragraphFile.style.display ="none"
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = "none";
        }
    });
}

prevImg()

// fontion qui vérifie si tout les inputs sont remplis
const inputTitle = document.querySelector("#title");
function verifFormCompleted() {
    const buttonValidForm = document.querySelector(".containerBoutonValider  button");

    formAjouterPhoto.addEventListener("input", () => {
        if (!inputTitle.value == "" && !inputFile.files[0] == "") {
            buttonValidForm.classList.remove("boutonValider");
            buttonValidForm.classList.add("buttonValidForm");
        } else {
            buttonValidForm.classList.remove("buttonValidForm");
            buttonValidForm.classList.add("boutonValider");
        }
    });
}

verifFormCompleted()