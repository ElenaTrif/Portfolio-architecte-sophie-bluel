/********Variables*******/
const gallery = document.querySelector(".gallery");

// Fonction pour récupérer les traveaux depuis l'API
async function fetchWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    return await reponse.json();
}
fetchWorks();

// Fonction pour afficher les traveaux dans la galerie
async function displayWorks() {
    const listWorks = await fetchWorks();
    console.log(listWorks);

    // Supprimer les traveaux du HTML déjà présents
    gallery.innerHTML = "";
    
    // Ajouter dynamiquement les traveaux
    listWorks.forEach((work) => {
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

displayWorks();