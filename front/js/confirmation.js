const confirmationElement = document.getElementById('orderId');

// récupération de l'url du produit
const urlData = new URLSearchParams(window.location.search);
// récupération de l'ID du produit
const orderId = urlData.get('orderId');

// affichage de l'id de la commande
confirmationElement.innerText = orderId;