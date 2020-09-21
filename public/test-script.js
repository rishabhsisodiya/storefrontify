// import React from 'react';
// import ReactDOM from 'react-dom';
// import PopOver from './PopOver';

const header = $("header.scrollheader").parent();
header
  .prepend(
    "<div id='sample'>hello coming from test script in public folder</div>"
  )
  .css({ "background-color": "orange", "text-sign": "center" });

// var node = document.createElement("h1");
// var textnode = document.createTextNode("Water");
// node.appendChild(textnode);
// document.body.appendChild(node);
{/* <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script> */}
{/* <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script> */}
var node = document.createElement("script");
// node.src("https://unpkg.com/react@16/umd/react.development.js");
node.setAttribute("src","https://unpkg.com/react@16/umd/react.development.js")
// node.setAttribute("crossorigin")
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
// var node = React.createElement("h1", "Hello from React");
// var textnode = document.createTextNode("Water");
// node.appendChild(textnode);
document.body.appendChild(node);
// document
// const divElement= document.body.appendChild("<div>REACT COMPONENT</div>")
// const preEpem=document.body.prepend('<div>REACT COMPONENT</div>')
// ReactDOM.render(
//   <React.StrictMode>
//     <PopOver/>
//   </React.StrictMode>,
//   document.getElementById('banner-message')
// );
// const bodyEl=document.getElementsByTagName('body');
// bodyEl.append('<div>Hello from React</dov>')
// console.log(bodyEl);
// console.log(ReactDOM);
// ReactDOM.render(<div>hello React</div>, document.getElementById("PageContainer"));
