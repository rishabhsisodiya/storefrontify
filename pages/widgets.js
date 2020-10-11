import React, { useState, useCallback } from "react";
import PopupWidget from "./PopupWidget";
import { Card, Spinner, Tabs } from "@shopify/polaris";
import SellerButtonWidget from "./SellerButtonWidget";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Cookies from "js-cookie";

const GET_SHOP = gql`
  query getShop {
    shop {
      url
    }
  }
`;

const widgets = () => {
  const { loading, error, data } = useQuery(GET_SHOP);
  console.log("Shop Data:", data);
  console.log("Shop Origin"+Cookies.get('shopOrigin'));
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "popup",
      content: "Popup Widget",
      accessibilityLabel: "Popup Widget",
      panelID: "popup",
    },
    {
      id: "seller",
      content: "Seller Button Widget",
      panelID: "seller",
    },
  ];
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  let shopUrl;
  if (data){
    shopUrl= data.shop.url
  }
  let selectedWidget;
  if (selected == 0) {
    selectedWidget = <PopupWidget shop={shopUrl} />;
  }
  if (selected == 1) {
    selectedWidget = <SellerButtonWidget shop={shopUrl} />;
  }
  
  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selectedWidget}
      </Tabs>
    </Card>
  );
};

export default widgets;
