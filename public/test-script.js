console.log("test script");

let header = $("header-site-header").parent();
header
  .prepend("<div>hello coming from test script in public folder</div>")
  .css({'background-color':'black','text-sign':'center' });
