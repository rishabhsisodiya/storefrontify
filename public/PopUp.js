const body = $("body");

body.css({
  position: "relative",
});

const shop = Shopify.shop;

const makePopup = () => {
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
            <h1 style="font-weight: bold;">Get on our list!</h1>
            <h3 style="font-size: 1rem;">Receive the latest trends and the best out of the best.-by Rishabh</h3>
        </div>
        <div class="popoverForm" style="display:flex;flex-wrap: wrap;justify-content:center; align-items:center;height: 20%;">
            <input id="cEmail" type="email" style="width:50%; margin-right: 1%;margin-left: 1%;border: 1px solid lightgray;border-radius: 10px" placeholder="Email" />
            <button id="sendemailbutton" style="width:max-content; max-width: 170px; color:#212529;border-radius:10px;margin-left: 1%;margin-right: 1%">
            <p style="color: white;font-weight: bold;">Get Superb Dresses</p>
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
if (!popupCookieArray.length) {
  makePopup()
}