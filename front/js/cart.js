
// Réccupération des données du panier
const productList = JSON.parse(localStorage.getItem('cart')) || [];

// Les caractéristiques du produit
for (let i = 0; i < productList.length; i++) {

    const productData = 
    `<h2>${productList[i].name}</h2>
    <p>${productList[i].color}</p>
    <p>${productList[i].price} €</p>`;
    
    // la div qui contient les caractéristiques
    const affichageDiv = document.getElementsByClassName('cart__item__content__description')[0];
    
    // AFFICHAGE DES PRODUITS
    const affichageProduits = affichageDiv.insertAdjacentHTML('beforeend', productData);
};

if (productList.length == 0) {
    const emptyCart = `<h2>Votre panier est vide</h2>`;
    affichageDiv.innerHTML = emptyCart;
}
else {
};



