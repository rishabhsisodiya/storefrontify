import React from 'react';
import ReactDOM from 'react-dom';
import PopOver from './PopOver';

const header = $("header.scrollheader").parent();
header
  .prepend("<div id='sample'>hello coming from test script in public folder</div>")
  .css({'background-color':'orange','text-sign':'center' });

ReactDOM.render(
  <React.StrictMode>
    <PopOver/>
  </React.StrictMode>,
  document.getElementById('sample')
);