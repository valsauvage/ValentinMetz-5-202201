let urlData = new URLSearchParams(window.location.search);
let productId = urlData.get('id');
let productUrl = "http://localhost:3000/api/products/" + productId;

fetch(productUrl)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

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

        let colorList = value.colors.length;
        let colorKey = Object.values(value.colors);

        for (let i = 0; i < colorList; i++) {
            document
                .getElementById('colors')
                .innerHTML += `<option id="color-value" value="${colorKey[i]}">${colorKey[i]}</option>`;
        }

        const productIndex = value.hasOwnProperty(0);

        let submit = document.getElementById('addToCart');

        submit.onclick = function () {

            let select = document.getElementById('colors');
            let selectedColor = select.options[select.selectedIndex].value;

            let quantity = document.getElementById('quantity').value;

            localStorage.clear();
            localStorage.setItem('id', productId);
            localStorage.setItem('color', selectedColor);
            localStorage.setItem('quantity', quantity);

            console.log(localStorage);
        };



    })
    .catch(function (err) {
        console.log('Erreur');
    });

