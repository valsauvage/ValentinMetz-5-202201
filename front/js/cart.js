const productList = JSON.parse(localStorage.getItem('cart')) || [];

// for (let i = 0; i < productList.length; i++) {
    document
        .getElementsByClassName('cart__item__content__description')
        .innerHTML += `
        <h2>${productList[0].name}</h2>
        <p>${productList[0].color}</p>
        <p>${productList[0].price}</p>`
// };