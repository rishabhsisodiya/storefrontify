import React, { useState , useCallback} from "react";
import PopupWidget from "./PopupWidget";
import { Page, Layout, Card, Tabs } from "@shopify/polaris";

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
//   if (selected == 0) {
      selectedWidget = (<PopupWidget />);
//   }
  return (
    <Page title="Create a widget for Your Store">
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            {selectedWidget}
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
  );
};

export default widgets;
