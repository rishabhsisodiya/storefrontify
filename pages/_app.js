import App from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import Cookies from "js-cookie";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    // To fix third-party session storage is blocked
    // const getShopOriginFromUrl  = () => {
    //   var url = new URL(window.location.href);
    //   return url.searchParams.get('shop');
    // }
    
    // const config = {
    //     apiKey: API_KEY,
    //     shopOrigin: getShopOriginFromUrl,
    //     forceRedirect: true,
    //   };

    // Take data from cookies
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get("shopOrigin"),
      forceRedirect: true,
    };
    return (
      <React.Fragment>
        <Head>
          <title>StoreFrontify</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
