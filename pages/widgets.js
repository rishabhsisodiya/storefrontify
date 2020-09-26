import React from "react";
import PopupWidget from "./PopupWidget";
import { Page, Layout, Card } from "@shopify/polaris";

const widgets = () => {
  return (
    <Page title="Create a widget for Your Store">
      <Layout>
        <Layout.Section secondary title="Pop Up Widget">
          <Card>
            <PopupWidget />
          </Card>
        </Layout.Section>
        <Layout.Section secondary title="Seller Button Widget">
          <Card>
            <PopupWidget />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default widgets;
