// récupération de l'url du produit
const urlData = new URLSearchParams(window.location.search);
// récupération de l'ID du produit
const productId = urlData.get('id');
// définition de l'url complet du produit
const productUrl = "http://localhost:3000/api/products/" + productId;

fetch(productUrl)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        // Récupération des différentes propriétés du produit
        document
            .getElementById('img')
            .src = value.imageUrl;
        document
            .getElementById('img')
            .alt = value.altText;
        document
            .getElementById('title')
            .innerHTML = value.name;
        document
            .getElementById('price')
            .innerHTML = value.price;
        document
            .getElementById('description')
            .innerHTML = value.description;

        // récupération des différentes couleurs du produit
        let colorList = value.colors.length;
        let colorKey = Object.values(value.colors);

        // affichage des couleurs dans la balise <select>
        for (let i = 0; i < colorList; i++) {
            document
                .getElementById('colors')
                .innerHTML += `<option id="color-value" value="${colorKey[i]}">${colorKey[i]}</option>`;
        }


        const productIndex = value.hasOwnProperty(0);

        // définition de la fonction à déclencher au clic sur le bouton "ajouter au panier"
        let submit = document.getElementById('addToCart');

        submit.onclick = function addProduct() {

            // fonction pour vérifier si une couleur a bien été selectionnée
            const select = document.getElementById('colors');
            const selectedColor = select.options[select.selectedIndex].value;
            
            // récupération de la quantité selectionnée
            const selectedQuantity = document.getElementById('quantity').value;

            // Fonction d'affichage du popup
            const popup = function () {
                if (window.confirm(`${value.name} couleur: ${selectedColor} a bien été ajouté au panier.
                Cliquez sur OK pour voir votre panier, ou sur ANNULER pour revenir au magasin.`)) {
                    window.location.href = "cart.html";

                } else {
                    window.location.href = "index.html";
                }
            };

            // vérifie si une couleur est selectionnée
            if (selectedColor.length == 0) {
                alert('veuillez sélectionner une couleur svp');
            }

            // vérifie si la quantité est supérieure à 1
            else if (selectedQuantity <= 0) {
                alert('veuillez sélectionner une quantité svp');
            }

            else {

                // Définition de l'objet produit en array
                const product = { id: productId, name: value.name, quantity: quantity, color: selectedColor, price: value.price, image: value.imageUrl };

                // On récupère le panier, s'il n'existe pas, il est créé automatiquement
                const cart = JSON.parse(localStorage.getItem("products")) || [];
                // On ajoute les données au panier

                // GESTION DE QUANTITÉ
                // 1. Le produit existe déjà ?
                // utilisation de la méthode .find
                const founded = cart.find(e => e.id === product.id && e.color === product.color);

                // 2. si il existe, on met la quantité à jour
                if (founded) {
                    let foundedNumber = Number(founded.quantity);
                    let selectedNumber = Number(selectedQuantity);
                    founded.quantity = selectedNumber += foundedNumber;

                }

                // 3. si il n'existe pas, on le rajoute
                else {
                    product.color = selectedColor;
                    product.quantity = selectedQuantity;
                    cart.push(product);
                }

                // On ajoute les données au panier
                localStorage.setItem("products", JSON.stringify(cart));

                // Popup produit ajouté à votre panier
                popup();
            }
            return false;
        };
    })
    .catch(function (err) {
        console.log('Erreur');
    });

