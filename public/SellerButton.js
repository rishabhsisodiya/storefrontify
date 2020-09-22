const body = $('body');

body.css({
    'position': 'relative'
})

const shop = Shopify.shop;

const makeApp = (products) => {

    const bestSellerContainer = $(
        `<div>Our best Seller</div>`
    )
    .css({
        'position': 'fixed',
        'background-color': '#ffffff',
        'padding': '10px',
        'border': '1px solid black',
        'bottom': '80px',
        'right': '25px',
        'height': '400px',
        'width': '350px',
        'display': 'none',
        'z-index':1,
    })

    const bestSellerButton = $('<img/>').attr('src', 'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923')
        .css({
            'position': 'fixed',
            'width': '150px',
            'bottom': '20px',
            'right': '20px',
            'cursor': 'pointer',
            'z-index':1,
        })

        body.append(bestSellerButton);
        body.append(bestSellerContainer);

        bestSellerButton.click(() => {
            bestSellerContainer.slideToggle();
        })
}
// https://storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com
// for cors issue add https://cors-anywhere.herokuapp.com/ below with https://storefrontify.herokuapp.com
fetch(
  "https://cors-anywhere.herokuapp.com/https://storefrontify.herokuapp.com/api/products?shop=ambraee-dev1.myshopify.com"
)
  .then((res) => res.json())
  .then((data) => {
    makeApp(data.data)
    // makeHeader(data.data);
    console.log(data);
  })
  .catch((error) => console.log(error));
