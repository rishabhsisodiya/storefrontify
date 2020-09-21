const header = $("header.scrollheader").parent();
header
  .prepend(
    "<div id='sample'>hello coming from test script in public folder</div>"
  )
  .css({ "background-color": "orange", "text-sign": "center" });
