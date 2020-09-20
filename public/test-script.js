console.log("test script");

const header = $("header.scrollheader").parent();
header
  .prepend("<div>hello coming from test script in public folder</div>")
  .css({'background-color':'black','text-sign':'center' });
