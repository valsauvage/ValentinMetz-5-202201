
fetch("http://localhost:3000/api/products")
.then(function (res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function (value) {
    console.log(value);
    
    // const productLength = value.length;
    
    let affichage = ``;


        for (let product of value) {
            affichage += `
            <a id="link" href="./product.html?id=${product._id}">
            <article>
              <img id="img" src=${product.imageUrl} alt="${product.altTxt}" />
              <h3 id="name" class="productName">${product.name}</h3>
              <p id="desc" class="${product.description}"></p>
              <h4 id="price" class="productPrice">${product.price} €</h4>
              <p id="colors">${product.colors}</p>
            </article>
            </a>`;
        }

        document
            .getElementById('items')
            .innerHTML = affichage;

    })
    .catch(function (err) {
        console.log('Erreur');
    });