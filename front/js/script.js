fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);

        const productList = value.length;

        // function getProducts() {
        //     for (let i = 0; i < productList; i++) {
        //         i = i++;
        //     }
        // };

        document
            .getElementById('name')
            .innerHTML = value[0].name;

    })
    .catch(function (err) {
        console.log('Erreur');
    });