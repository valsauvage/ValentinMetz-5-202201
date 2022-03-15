// récupération de l'url du produit
let urlData = new URLSearchParams(window.location.search);
// récupération de l'ID du produit
let productId = urlData.get('id');
// définition de l'url complet du produit
let productUrl = "http://localhost:3000/api/products/" + productId;

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

            if (selectedColor.length == 0) {
                alert('veuillez sélectionner une couleur svp')
            }
            
            else {
                // récupération de la quantité
                let quantity = document.getElementById('quantity').value;


                // Définition du PRODUCT ARRAY
                const product = { id: productId, name: value.name, quantity: quantity, color: selectedColor, price: value.price, image: value.imageUrl };

                // On récupère le panier, s'il n'existe pas, il est créé automatiquement
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                console.log("🚀 ~ file: products.js ~ line 70 ~ addProduct ~ cart", cart)

                // GESTION DE QUANTITÉ
                // 1. Le produit existe déjà ?
                // utilisation de la méthode .find
                const founded = cart.find(e => e.id === product.id && e.color === product.color);

                // 2. si il existe, on met la quantité à jour
                if (founded) {
                    founded.quantity += quantity;
                }

                // 3. si il n'existe pas, on le rajoute

                else {
                    product.color = selectedColor;
                    product.quantity = quantity;
                    cart.push(product);
                }

                // On ajoute les données
                localStorage.setItem("cart", JSON.stringify(cart));

                alert('Produit ajouté à votre panier !');
            }

        };


    })
    .catch(function (err) {
        console.log('Erreur');
    });

