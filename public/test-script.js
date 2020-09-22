// const header = $("header.scrollheader").parent();
// header
//   .prepend(
//     "<div id='sample'>hello coming from test script in public folder</div>"
//   )
//   .css({ "background-color": "orange", "text-sign": "center" });
// const makeHeader = (data) => {
//   header
//     .prepend(`<div>${data}</div>`)
//     .css({ "background-color": "orange", "text-align": "center" });
// // };

const body = $("body");

body.css({
  position: "relative",
});

const shop = Shopify.shop;

{/* <h2>jQuery Pop-Up Example</h2>
<button class="open">Open</button> */}
const popupOverlay = $(`
<div></div>
`).css({
    'visibility': 'visible',
  'position': 'fixed',
  'background': '#ffffff',
  'border': '2px solid #666666',
  'width': '50%',
  'height': '50%',
  'left': '50%',
  'right':'50%',
  'z-index':1
});
const popverContent = $(`
    <div>
        <h2>Pop-Up</h2>
        <p> This is an example pop-up that you can make using jQuery.</p>
        <!--popup's close button-->
        <button>Close</button>
    </div>
`).css({
    'visibility':'visible',
    'z-index':1
})
popupOverlay.append(popverContent)
body.append(popupOverlay)


const makeApp = (products) => {
  const bestSellerContainer = $(
    `<div style="overflow-y: scroll;">
            <h3>Our Best Sellers</h3>
            ${products
              .map((item) => {
                return `
                <a href="/products/${item.handle}" style="display: flex; align-items: center; padding: 20px 10px; border-top: 1px solid black;">
                    <img src=${item.images[0].originalSrc} style="width: 75px;" />
                    <div style="display: flex; justify-content: space-between; align-items: start; width: 100%;">
                        <p style="padding: 0 10px;">${item.title}</p>
                        <p>${item.variants[0].price}</p>
                    </div>
                </a>
                `;
              })
              .join("")}
        </div>`
  ).css({
    'position': "fixed",
    "background-color": "#ffffff",
    'padding': "10px",
    'border': "1px solid black",
    'bottom': "80px",
    'right': "25px",
    'height': "400px",
    'width': "350px",
    'display': "none",
    "z-index": 1,
  });

  const bestSellerButton = $("<img/>")
    .attr(
      "src",
      "https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923"
    )
    .css({
      'position': "fixed",
      'width': "150px",
      'bottom': "20px",
      'right': "20px",
      'cursor': "pointer",
      "z-index": 1,
    });

  body.append(bestSellerButton);
  body.append(bestSellerContainer);

  bestSellerButton.click(() => {
    bestSellerContainer.slideToggle();
  });
};
// https://storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com
// for cors issue add https://cors-anywhere.herokuapp.com/ below with https://storefrontify.herokuapp.com
fetch(
  "https://cors-anywhere.herokuapp.com/https://storefrontify.herokuapp.com/api/products?shop=ambraee-dev1.myshopify.com"
)
  .then((res) => res.json())
  .then((data) => {
    makeApp(data.data);
    // makeHeader(data.data);
    console.log(data);
  })
  .catch((error) => console.log(error));
