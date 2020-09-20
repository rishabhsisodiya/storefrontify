console.log("test script");

const headerElement = $("header.site-header").parent();
headerElement
  .prepend("<div>hello coming from test script in public folder</div>")
  .css({'background-color':'black','text-sign':'center' });
