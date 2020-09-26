import React, { useState , useCallback} from "react";
import PopupWidget from "./PopupWidget";
import { Card, Tabs } from "@shopify/polaris";
import SellerButtonWidget from "./SellerButtonWidget";

const widgets = () => {
    const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'popup',
      content: 'Popup Widget',
      accessibilityLabel: 'Popup Widget',
      panelID: 'popup',
    },
    {
      id: 'seller',
      content: 'Seller Button Widget',
      panelID: 'seller',
    },
  ];
  let selectedWidget;
  if (selected == 0) {
      selectedWidget = (<PopupWidget />);
  }
  if(selected ==1){
      selectedWidget= (<SellerButtonWidget />);
  }
  return (
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card>
            {selectedWidget}
          </Card>
        </Tabs>
      </Card>
  );
};

export default widgets;
