fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {

        let urlData = new URLSearchParams(window.location.search);
        let productId = urlData.get('id');

        for (let i in value) {

            if (productId == value[i]._id) {

                document
                    .getElementById('img')
                    .src = value[i].imageUrl;
                document
                    .getElementById('img')
                    .alt = value[i].altText;
                document
                    .getElementById('title')
                    .innerHTML = value[i].name;
                document
                    .getElementById('price')
                    .innerHTML = value[i].price;
                document
                    .getElementById('description')
                    .innerHTML = value[i].description;

                let colorList = value[i].colors.length;
                let colorKey = Object.values(value[i].colors);
                let affichage = ``;

                for (let j = 0; j < colorList; j++) {
                    affichage += `<option id="color-value" value="${colorKey[j]}">${colorKey[j]}</option>`;
                    document
                        .getElementById('colors')
                        .innerHTML = affichage;
                }
            }
        }

        const productIndex = value.hasOwnProperty(0);

        let submit = document.getElementById('addToCart');
        
        submit.onclick = function() {

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

