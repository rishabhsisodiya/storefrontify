import React, { useState } from "react";
import { EmptyState, Layout, Page, Card, Button } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";
import axios from "axios";

const SellerButtonWidget = (props) => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", idsFromResources);

    const selectedProducts = resources.selection;

    // deleteApiData();

    selectedProducts.map((product) => makeApiCall(product));
  }

  // function deleteApiData() {
  //   const url = "/api/products";

  //   axios.delete(url);
  // }

  async function makeApiCall(products) {
    const url = "/api/shop";

    axios
      .post(url, { shop: props.shopUrl, products })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      {emptyState ? (
        <Layout>
          <EmptyState
            heading="Manage your inventory transfers"
            action={{
              content: "Select Products",
              onAction: () => setModal({ open: true }),
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Select Products</p>
          </EmptyState>
        </Layout>
      ) : (
        <Layout>
          <Layout.Section>
            <Button onClick={() => setModal({ open: true })} primary>
              Select New Products
            </Button>
          </Layout.Section>
          <Layout.Section>
            <ProductList />
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
};

export default SellerButtonWidget;
