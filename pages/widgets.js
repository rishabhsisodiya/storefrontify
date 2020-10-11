import React, { useState, useCallback } from "react";
import PopupWidget from "./PopupWidget";
import { Card, Spinner, Tabs } from "@shopify/polaris";
import SellerButtonWidget from "./SellerButtonWidget";
import Cookies from "js-cookie";

const widgets = () => {
  const shopUrl=Cookies.get('shopOrigin');
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
