require("isomorphic-fetch");
const dotenv = require("dotenv");
const Koa = require("koa");
const KoaRouter = require("koa-router");
const next = require("next");
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const mount = require("koa-mount");

dotenv.config();
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");
const getSubscriptionUrl = require("./server/getSubscriptionUrl");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, API_VERSION } = process.env;

const server = new Koa();
const router = new KoaRouter();

var products = [];
router.get("/popup", async(ctx) =>{
  try {
    // CORS ISSUE FIX
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = {
      status: "success",
      popup: ctx.cookies.get("closePopup"),
    };
  } catch (error) {
    console.log(error);
  }
})
router.post("/api/send", koaBody(), async (ctx) => {
  try {
    const email = ctx.request.body;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      ctx.body = "Thank You for Subscription!!!";
      // save to database
      console.log(email);
    }else{
      ctx.body = "Entered wrong email. Please try again!!";
    }
    
    ctx.cookies.set("closePopup", true);
    ctx.set('Access-Control-Allow-Origin', '*');
    console.log('mail in cookie:',ctx.cookies.get("closePopup"));
  } catch (error) {
    console.log(error);
  }
});
router.get("/api/products", async (ctx) => {
  try {
    // CORS ISSUE FIX
    ctx.set('Access-Control-Allow-Origin', '*');
    // when not logged in shopify admin app script is blocked by browser without proper auth
    // so content type is nosniff
    // ctx.set('X-Content-Type-Options','nosniff');
    ctx.body = {
      status: "success",
      data: products,
    };
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/products", koaBody(), async (ctx) => {
  try {
    const body = ctx.request.body;
    await products.push(body);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = "Item Added";
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/products", koaBody(), async (ctx) => {
  try {
    products = [];
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.body = "All items deleted!";
  } catch (error) {
    console.log(error);
  }
});

// Router Middleware
server.use(router.allowedMethods());
server.use(router.routes());

// Mount app on root path using compiled REact app in the dist folder
server.use(mount("/", koaStatic(__dirname + "/public")));
app.prepare().then(() => {
  // const server = new Koa();
  // const router = new KoaRouter();
  server.use(session({ secure: true, sameSite: "none" }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        "write_products",
        "read_products",
        "write_script_tags",
        "read_script_tags",
      ],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });
        // ctx.set('X-Content-Type-Options','nosniff')
        // ctx.set('Access-Control-Allow-Origin', '*');
        // ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        ctx.redirect("/");

        // uncomment below code to add subscription billing page for your app
        //  await getSubscriptionUrl(ctx, accessToken, shop);
      },
    })
  );

  server.use(graphQLProxy({ version: ApiVersion.October19 }));
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return;
  });
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
