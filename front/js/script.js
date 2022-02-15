function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value);
        })
        .catch(function (err) {
            console.log('Erreur');
        });
};


async function displayProducts() {
    const itemsList = document.getElementById('items');
    const produits = await getProducts();
    const productsNumber = await getProducts.length;

    for (let i = 0; i < productsNumber; i++) {
        product += i;
        
        itemsList.insertAdjacentHTML('afterend', ' <a href=' + getProducts.url + '"><article><img src="' + getProducts.imageUrl + '.../product01.jpg" alt="' + getProducts.altTxt + '"><h3 class="productName">' + getProducts.name + '</h3><p class="productDescription">' + getProducts.description + '</p></article></a>');
    }
    


}