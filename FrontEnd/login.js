/********Variables*******/
// Sélection des éléments HTML du formulaire
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector(".form");
const loginFailed = document.querySelector(".loginFailed");


// Ajout d'un gestionnaire d'événements pour le formulaire lorsqu'il est soumis
form.addEventListener("submit", function (event) {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupération des valeurs des champs d'e-mail et de mot de passe
    const emailUser = email.value;
    const passwordUser = password.value;

    // Création de la charge utile au format JSON contenant l'e-mail et le mot de passe
    const connection = {
        email: emailUser,
        password: passwordUser,
    };
    const chargeUtile = JSON.stringify(connection);

    // Appel de la requête - fonction fetch avec toutes les informations nécessaires 
    fetch("http://localhost:5678/api/users/login", {
        method: "POST", // Méthode de la requête (POST pour la connexion)
        headers: { "Content-Type": "application/json" }, // En-tête spécifiant le type de contenu (JSON)
        body: chargeUtile, // Corps de la requête contenant les données JSON
    })
    .then((response) => {
      // Vérification de la réussite de la requête
        if (!response.ok) {
            // Si la requête échoue, affichage d'un message d'erreur et arrêt du traitement
          loginFailed.textContent = "E-mail et/ou mot de passe incorrect(s).";
          loginFailed.style.color = "#FF0000";
          throw new Error("E-mail et/ou mot de passe incorrect(s).");
        }
        return response.json(); // Si la requête réussit, renvoie la réponse au format JSON
      })
      .then((data) => {
      // Traitement des données JSON
        const userId = data.userId;
        const userToken = data.token;

        // Stockage du token et de l'ID utilisateur dans la session du navigateur
        window.sessionStorage.setItem("token", userToken);
        window.sessionStorage.setItem("userId", userId);

        // Redirection vers la page "index.html" après la connexion réussie
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("user not found", error);
      });
    
});