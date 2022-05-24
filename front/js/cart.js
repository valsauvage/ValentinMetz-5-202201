
// Récupération des données du panier
let cart = '';
function getCart() { cart = JSON.parse(localStorage.getItem('products')) || []; }


// Récupération du prix de chaque produit depuis l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    for (let item of cart) {
      const founded = value.find(e => e._id === item.id);
      item.price = founded.price;
    };

    // Affichage des produits
    // la div qui contient les caractéristiques
    const affichageDiv = document.getElementById('cart__items');

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

        // AFFICHAGE DES PRODUITS
        const affichageProduits = affichageDiv.insertAdjacentHTML('beforeend', productData);
      };
    };

    // Gestion du bouton supprimmer
    const deleteBtn = document.getElementsByClassName('deleteItem');

    for (let j = 0; j < cart.length; j++) {

      deleteBtn[j].addEventListener('click', (event) => {
        event.preventDefault();

        // Récupération des éléments
        // élément à supprimer du panier
        const itemToDelete = cart.find(e => e.id === cart[j].id && e.color === cart[j].color);

        // Balise à supprimer du DOM
        const getArticleId = document.querySelector('[data-id="' + cart[j].id + '"]' + '[data-color="' + cart[j].color + '"]');

        // Récupération de l'index de l'élément à supprimer
        const index = cart.indexOf(itemToDelete);

        // Suppression de l'élément
        if (index > -1) {
          cart.splice(index, 1);
        }

        // On met à jour les données au panier
        localStorage.setItem("products", JSON.stringify(cart));

        // suppression de la balise article
        getArticleId.parentNode.removeChild(getArticleId);

        // Mise à jour du prix et de la quantité
        getTotalPrice();
        getCart();

      });
    };

    // Détection de l'ajout de quantité
    const changeQty = document.getElementsByClassName('itemQuantity');

    for (let k = 0; k < cart.length; k++) {
      changeQty[k].addEventListener('change', (event) => {
        event.preventDefault();


        const itemToChange = cart.find(e => e.id === cart[k].id && e.color === cart[k].color);

        // on récupère la valeur de la quantité
        const newQty = changeQty[k].value;

        // on met à jour la nouvelle quantité
        itemToChange.quantity = newQty;

        // On ajoute les données au panier
        localStorage.setItem("products", JSON.stringify(cart));

        // Mise à jour de la quantité et du prix total
        getTotalPrice();
        getCart();
      });
    };

    // CALCUL DU PRIX ET DE LA QUANTITÉ DU PANIER
    function getTotalPrice() {

      let totalQtyCalc = [];
      let totalPriceCalc = [];

      // récuération des prix des produits
      for (let l = 0; l < cart.length; l++) {

        // je récupère les quantités
        let cartQty = cart[l].quantity;

        // je multiplie les prix par la quantité de chaque produit
        let cartPrices = cart[l].price * cart[l].quantity;

        // j'ajoute chaque quantité au total
        totalQtyCalc.push(Number(cartQty));
        // j'ajoute chaque prix au total
        totalPriceCalc.push(cartPrices);

      };


      // Je calcule le total
      let totalQty = 0;
      let totalPrice = 0;

      // je calacule la quantité totale
      for (let m = 0; m < totalQtyCalc.length; m++) {
        totalQty += totalQtyCalc[m];
      };

      // je calcule le prix total
      for (let n = 0; n < totalPriceCalc.length; n++) {
        totalPrice += totalPriceCalc[n];
      };

      // J'affiche les totaux
      const affichageQty =
        document
          .getElementById('totalQuantity')
          .innerHTML = totalQty;

      const affichagePrix =
        document
          .getElementById('totalPrice')
          .innerHTML = totalPrice;
    };
    getTotalPrice();
  })
  .catch(function (err) {
    console.log('erreur');
  });

getCart();


// VALIDATION DU FORMULAIRE
// --> validation de formulaire html (min-lenght, max-lenght, regex, etc.)

// Éléments du formulaire
const sendFirstName = document.getElementById('firstName');
const sendLastName = document.getElementById('lastName');
const sendAddress = document.getElementById('address');
const sendCity = document.getElementById('city');
const sendEmail = document.getElementById('email');


// Récupération du bouton d'envoi
const orderButton = document.getElementById('order');

// Récupération des données du formulaire dans localStorage
const form = JSON.parse(localStorage.getItem("contact"));

if (form) {
  sendFirstName.value = form.firstName;
  sendLastName.value = form.lastName;
  sendAddress.value = form.address;
  sendCity.value = form.city;
  sendEmail.value = form.email;
}


const htmlForm = document.querySelector('form');

// BOUTON ENVOYER
orderButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (htmlForm.checkValidity()) {
    // envoi de form dans le localStorage
    const form = { firstName: sendFirstName.value, lastName: sendLastName.value, address: sendAddress.value, city: sendCity.value, email: sendEmail.value };
    localStorage.setItem('contact', JSON.stringify(form));

    alert('Votre commande a bien été envoyée !');

    const products = Object.values(cart).map((product) => {
      return product.id
    });

    const order = {
      contact: form,
      products: products,
    };

    async function post() {
      const waiting = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then((response) => response.json())
        .then((json) => {
          window.location.href = `${window.location.origin}/front/html/confirmation.html?orderId=${json.orderId}`
        })
        .catch(() => {
          alert(error)
        })
    }
    post();

  } else {
    //Validate Form
    htmlForm.reportValidity();
  }
});

