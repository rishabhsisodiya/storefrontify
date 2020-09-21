// import React from 'react';
// import ReactDOM from 'react-dom';
// import PopOver from './PopOver';

const header = $("header.scrollheader").parent();
header
  .prepend("<div>hello coming from test script in public folder</div>")
  .css({'background-color':'orange','text-sign':'center' });

  document.body.appendChild("<div>REACT COMPONENT</div>")
// ReactDOM.render(
//   <React.StrictMode>
//     <PopOver/>
//   </React.StrictMode>,
//   document.getElementById('banner-message')
// );