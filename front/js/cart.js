
// Réccupération des données du panier
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// affichage du panier vide
if (cart.length == 0) {
    const emptyCart = `<h2>Votre panier est vide</h2>`;
    affichageDiv.innerHTML = emptyCart;
}
else {

    // Les caractéristiques du produit
    for (let i = 0; i < cart.length; i++) {

        const productData =
            `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
        <div class="cart__item__img">
          <img src="${cart[i].image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${cart[i].name}</h2>
            <p>${cart[i].color}</p>
            <p>${cart[i].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Quantité : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

        // la div qui contient les caractéristiques
        const affichageDiv = document.getElementById('cart__items');

        // AFFICHAGE DES PRODUITS
        const affichageProduits = affichageDiv.insertAdjacentHTML('beforeend', productData);
    };
};

// Gestion du bouton supprimmer
const deleteBtn = document.getElementsByClassName('deleteItem');

for (let j = 0; j < cart.length; j++) {

    deleteBtn[j].addEventListener('click', (event) => {
        event.preventDefault();

        const itemToDelete = cart.find(e => e.id == cart[j].id);
        const index = cart.indexOf(itemToDelete);

        if (index > -1) {
            cart.splice(index, 1);
        }
        // On ajoute les données au panier
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();

    });
};


