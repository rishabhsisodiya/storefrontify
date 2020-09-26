import React from "react";
import PopupWidget from "./PopupWidget";
import { Page, Layout } from "@shopify/polaris";

const widgets = () => {
  return (
    <Page title="Create a widget for Your Store">
      <Layout>
        <Layout.Section secondary>
          <PopupWidget />
        </Layout.Section>
        <Layout.Section secondary>
          <PopupWidget />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default widgets;
