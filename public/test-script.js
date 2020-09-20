console.log("test script");

const header = $("shopify-section-header").parent();
header
  .prepend("<div>hello coming from test script in public folder</div>")
  .css({'background-color':'black','text-sign':'center' });
