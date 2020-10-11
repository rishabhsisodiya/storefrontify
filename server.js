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
const mongoose = require("mongoose");
const config = require("./config/key");
dotenv.config();
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");
const getSubscriptionUrl = require("./server/getSubscriptionUrl");

const connect = mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
// models
const { Shop } = require("./models/Shop");
const { Product } = require("./models/Product");
const { PopUp } = require("./models/PopUp");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, API_VERSION } = process.env;

const server = new Koa();
const router = new KoaRouter();

var products = [];
router.get("/api/shop", async (ctx) => {
  let popupData = null;
  let productsData = [];
  console.log("paramas:", ctx.url.split("="));

  const shopName = ctx.url.split("=")[1];
  console.log("shop=" + shopName);
  try {
    // CORS ISSUE FIX
    ctx.set("Access-Control-Allow-Origin", "*");
    // get data products and pop
    Shop.findOne({ name: shopName }, function (err, doc) {
      let statusCode;
      let msg;
      if (err) {
        statusCode = 400;
        msg = err;
      }
      // If shop Exist
      if (doc) {
        // Check popup data is present in request or not
        if (doc.popup) {
          popupData = doc.popup;
        }
        // Check products data is present in request or not
        if (doc.products) {
          productsData = doc.products;
        }

        // doc.save();
        statusCode = 201;
        msg = "Shop Data Updated";
      }
      ctx.res.statusCode = 201;
      ctx.res.statusMessage = "Shop Data Added";
      console.log("inside function", ctx);
    });
    ctx.body = {
      status: "success",
      popupData,
      productsData,
    };
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/shop", koaBody(), async (ctx) => {
  try {
    // console.log("paramas:", ctx.url.split('='));

    // const shopName = ctx.url.split('=')[1];
    // console.log('shop='+shopName);
    ctx.set("Access-Control-Allow-Origin", "*");
    const { shop, popup, products } = ctx.request.body;
    console.log("shop: ", shop + ",popup: " + popup + ",products:" + products);
    // const shop = new Shop(body);
    const newShop = new Shop({ name: shop, popup, products });
    console.log("NEw shop:", newShop);
    newShop.save((err) => {
      if (err) {
        statusCode = 400;
        msg = err;
        throw err;
      } else {
        statusCode = 201;
        msg = "Shop Data Added";
        console.log(msg);
      }
    });
    // Find and update else create
    Shop.findOne({ name: shop }, function (err, doc) {
      console.log("inside findONe");
      let statusCode;
      let msg;
      if (err) {
        console.log(err);
        throw err;
      }
      // If shop Exist
      if (doc) {
        // Check popup data is present in request or not
        if (popup) {
          doc.popup = popup;
        }
        // Check products data is present in request or not
        if (products) {
          doc.products = products;
        }

        doc.save();
        statusCode = 201;
        msg = "Shop Data Updated";
        console.log(msg);
      }
      // Shop not exist , Create a new one
      else {
        // console.log("creating new shop",doc);
        const newShop = new Shop({ name: shop, popup, products });
        console.log("NEw shop:", newShop);
        newShop.save((err) => {
          if (err) {
            statusCode = 400;
            msg = err;
            throw err;
          } else {
            statusCode = 201;
            msg = "Shop Data Added";
          }
        });
      }
      console.log(msg);
      // ctx.res.statusCode = 201;
      // ctx.res.statusMessage = "Shop Data Added";
      // console.log("inside function", ctx);
    });
    ctx.res.statusCode = 201;
    ctx.res.statusMessage = "Shop Data Added";
    // console.log("outside function", ctx);
  } catch (error) {
    console.log("catch error:", error);
    ctx.res.statusCode = 400;
    ctx.res.statusMessage = error;
  }
});

router.post("/api/send", koaBody(), async (ctx) => {
  try {
    const email = ctx.request.body;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      ctx.body = "Thank You for Subscription!!!";
      // save to database
      console.log(email);
    } else {
      ctx.body = "Entered wrong email. Please try again!!";
    }
    ctx.set("Access-Control-Allow-Origin", "*");
  } catch (error) {
    console.log(error);
  }
});

// router.get("/api/popup", async (ctx) => {
//   try {
//     // CORS ISSUE FIX
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.body = {
//       status: "success",
//       data: popupData,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/api/popup", koaBody(), async (ctx) => {
//   try {
//     const body = ctx.request.body;
//     popupData = body;
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.body = "Item Added";
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/api/products", async (ctx) => {
  try {
    // CORS ISSUE FIX
    ctx.set("Access-Control-Allow-Origin", "*");
    console.log("paramas:", ctx.params);
    // Product.find
    ctx.body = {
      status: "success",
    };
  } catch (error) {
    console.log(error);
  }
});

router.post("/api/products", koaBody(), async (ctx) => {
  try {
    const body = ctx.request.body;
    const product = new Product(body);
    console.log("paramas:", ctx.params);
    product.save((err) => {
      if (err) {
        ctx.response.status = 404;
        ctx.body = {
          status: "Products not Saved",
          err,
        };
      } else {
        ctx.response.status = 201;
        ctx.body = "products created";
      }
    });
    ctx.set("Access-Control-Allow-Origin", "*");
    // ctx.body = "Item Added";
  } catch (error) {
    console.log(error);
  }
});

// router.delete("/api/products", koaBody(), async (ctx) => {
//   try {
//     products = [];
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.body = "All items deleted!";
//   } catch (error) {
//     console.log(error);
//   }
// });

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
