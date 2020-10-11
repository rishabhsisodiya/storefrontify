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

// const reactScript = $(`
// <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
// <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
// <script src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js" crossorigin></script>
// <script src="https://storefrontify.herokuapp.com/PopOver.js"></script>
// `)
// body.append(reactScript)

const body = $("body");

body.css({
  position: "relative",
});

const shop = Shopify.shop;

const makePopup = (popData) => {
  const popupOverlay = $(`
  <div></div>
  `).css({
    position: "fixed",
    background: "rgb(0,0,0,0.4)",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "border-radius": "10px",
    width: "100vw",
    height: "100vh",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    "z-index": 1,
  });
  const popoverContent = $(`
    <div>
        <div style="height: 5%;">
            <span 
            class="closePopover" 
            style="color: black;float:right;font-size:30px;font-weight:bold; cursor:pointer"
            >&times;
            </span>
        </div>
        <div class="popoverImage" style="justify-content:center; align-items:center width: 100%;height: 50%;padding-left: 5%;padding-right: 5%;">
            <img 
            src="https://bucket.mlcdn.com/a/2384/2384591/images/6774149206a58f05547bc10c499248404c907d7b.jpeg/e11c41a0eb4fb1bb73c36636ec16d818a8289d3e.jpeg" 
            style="width:100%; height: 100%; object-fit: cover;"
            />
        </div>
        <div class="popoverContent" style="justify-content:center; align-items:center height: 25%;padding: 2%; text-align:center">
            <h1 style="font-weight: bold;">${popData.popHeading}</h1>
            <h3 style="font-size: 1rem;">${popData.popContent}</h3>
        </div>
        <div class="popoverForm" style="display:flex;flex-wrap: wrap;justify-content:center; align-items:center;height: 20%;">
            <input id="cEmail" type="email" style="width:50%; margin-right: 1%;margin-left: 1%;border: 1px solid lightgray;border-radius: 10px" placeholder="Email" />
            <button id="sendemailbutton" style="width:max-content; max-width: 170px; color:#212529;border-radius:10px;margin-left: 1%;margin-right: 1%">
            <p style="color: white;font-weight: bold;">${popData.textButton}</p>
            </button>
        </div>
    </div>
`).css({
    visibility: "visible",
    "z-index": 1,
    padding: "10px",
    width: "85%",
    right: "10%",
    left: "10%",
    top: "10%",
    bottom: "10%",
    background: "whitesmoke",
    "border-radius": "10px",
    "max-width": "700px",
    "max-height": "500px",
  });

  popupOverlay.append(popoverContent);
  body.append(popupOverlay);

  $(".closePopover").click(() => {
    document.cookie = "closepopup=true;"
    popupOverlay.slideToggle();
  });

  $("#sendemailbutton").click(() => {
    const email =$("#cEmail").val();
    $.post('https://storefrontify.herokuapp.com/api/send', {email:email}, function(data, status, xhr) {
      alert(data);
  }).fail(function(jqxhr, settings, ex) { alert('Something went wrong!!.Pleas try again later, ' + ex); });

    $("#cEmail").val("");
    document.cookie = "closepopup=true;"
  });
};
 
// split cookie 
let cookieArray = document.cookie.split(';');

let popupCookieArray =cookieArray.filter(str=> str.includes("closepopup"))
// let closepopvalue=popupCookieArray[0].split("=")[1];
// First time visited website , doesn't have closepopup value
// console.log('popup closed: ',popupCookieArray);
// if (!popupCookieArray.length) {
//   fetch(
//     `https://storefrontify.herokuapp.com/api/shop?shop=https://${shop}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       // if no data then pop will not display
//       if(data.popupData){
//         console.log(data.popupData);
//         makePopup(data.popupData);
//       }
//     })
//     .catch((error) => console.log(error));
// }


//  Best Seller APP
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
    position: "fixed",
    "background-color": "#ffffff",
    padding: "10px",
    border: "1px solid black",
    bottom: "80px",
    right: "25px",
    height: "400px",
    width: "350px",
    display: "none",
    "z-index": 1,
  });

  const bestSellerButton = $("<img/>")
    .attr(
      "src",
      "https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923"
    )
    .css({
      position: "fixed",
      width: "150px",
      bottom: "20px",
      right: "20px",
      cursor: "pointer",
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
  `https://storefrontify.herokuapp.com/api/shop?shop=${shop}`
)
  .then((res) => res.json())
  .then((data) => {
    if (data.productsData) {
      makeApp(data.productsData);
    }
    // Popup Widgets
    if (data.popupData && !popupCookieArray.length) {
      console.log(data.popupData);
        makePopup(data.popupData);
    }
  })
  .catch((error) => console.log(error));

// storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com
// https://storefrontify.herokuapp.com/api/products?shop=ambraee-dev1.myshopify.com
// Notes:
// CASE 1: Call /api/products
// 1. when ctx.set('X-Content-Type-Options','nosniff');
// The resource from “https://ambraee-dev1.myshopify.com/admin/auth/login” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff).
// warning: Loading failed for the <script> with source “https://storefrontify.herokuapp.com/test-script.js?shop=ambraee-dev1.myshopify.com”.
// 2. when there is no content type set
// SyntaxError: expected expression, got '<'
// and with warning The script from “https://storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com” was loaded even though its MIME type (“text/html”) is not a valid JavaScript MIME

// CASE 2: remove call to /api/products
// When we dont call api and just try to access our public folder it throw
// SyntaxError: expected expression, got '<'
// and with warning The script from “https://storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com” was loaded even though its MIME type (“text/html”) is not a valid JavaScript MIME

// CASE 3: remove popup code
// SyntaxError: expected expression, got '<'
// and with warning The script from “https://storefrontify.herokuapp.com/auth?shop=ambraee-dev1.myshopify.com” was loaded even though its MIME type (“text/html”) is not a valid JavaScript MIME
