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
                    
                // document
                //     .getElementById('colors')
                //     .innerHTML = value[i].colors;

            }
        }

        const productIndex = value.hasOwnProperty(0);


    })
    .catch(function (err) {
        console.log('Erreur');
    });

