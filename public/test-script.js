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

{
  /* <h2>jQuery Pop-Up Example</h2>
<button class="open">Open</button> */
}
// const popupImage = $("<img/>")
// .attr(
//   "src",
//   "https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923"
// ).css({
//     'visibility': 'visible',
//   'position': 'fixed',
//   'background': '#ffffff',
//   'border': '3px solid #666666',
//   'width': '50%',
//   'height': '50%',
//   'left': '25%',
//   'z-index':1
// });
// body.append(popupImage)
const popupOverlay = $(`
<div></div>
`).css({
  visibility: "visible",
  position: "fixed",
  background: "#ffffff",
  border: "3px solid #666666",
  width: "50%",
  height: "70%",
  left: "25%",
  bottom: "25%",
  "z-index": 1,
});
const popoverContent = $(`
    <div>
        <span 
        class="closePopover" 
        style="color: #aaaaaa;float:right;font-size:28px;font-weight:bold; pointer:cursor"
        >&times;
        </span>
        <div style="justify-content:center; align-items:center">
            <img 
            src="https://bucket.mlcdn.com/a/2384/2384591/images/6774149206a58f05547bc10c499248404c907d7b.jpeg/e11c41a0eb4fb1bb73c36636ec16d818a8289d3e.jpeg" 
            style="width:100%"
            />
        </div>
        <div style="justify-content:center; align-items:center">
            <h1>Get on our list!</h1>
            <p>Receive the latest trends and the best out of the best.</p>
        </div>
        <div style="display:flex; padding:10px;justify-content:center; align-items:center">
            <input id="cEmail" type="email"  placeholder="Email" />
            <button id="sendemailbutton" style="color:#212529;border-radius:10px">Get Superb Dresses</button>
        </div>
        

    </div>
`).css({
  visibility: "visible",
  "z-index": 1,
  padding: "10px",
});


popupOverlay.append(popoverContent);
body.append(popupOverlay);

$(".closePopover").click(() => {
    popupOverlay.slideToggle();
  });
  
  ("#sendemailbutton").click(() => {
    alert($("#cEmail").val());
    $("#cEmail").val("");
  });

// const sendEmailButton = $(`<button>Get Superb Dresses </button>`).css({
//   "text-align": "center",
//   "vertical-align": "middle",
//   'color': "#212529",
//   "border-radius": "10px",
// });
// popoverContent.append(sendEmailButton);
// const closeButton = $(`<span>&times;</span>`).css({
//   color: "#aaaaaa",
//   float: "right",
//   "font-size": "28px",
//   "font-weight": "bold",
//   pointer: "cursor",
// });
// const popupImage = $("<img/>")
// .attr(
//   "src",
//   "https://bucket.mlcdn.com/a/2384/2384591/images/6774149206a58f05547bc10c499248404c907d7b.jpeg/e11c41a0eb4fb1bb73c36636ec16d818a8289d3e.jpeg"
// ).css({
//     'width':'100%',
// })
// popupOverlay.append(closeButton);
// popupOverlay.append(popupImage);
// popupOverlay.append(popoverContent);
// body.append(popupOverlay);

// Event handle of close button
// closeButton.click(() => {
//   popupOverlay.slideToggle();
// });

// sendEmailButton.click(() => {
//   alert($("#cEmail").val());
//   $("#cEmail").val("");
// });


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
  "https://cors-anywhere.herokuapp.com/https://storefrontify.herokuapp.com/api/products?shop=ambraee-dev1.myshopify.com"
)
  .then((res) => res.json())
  .then((data) => {
    makeApp(data.data);
    // makeHeader(data.data);
    console.log(data);
  })
  .catch((error) => console.log(error));
