import React, { useState } from "react";
import { Button, Tabs, Steps } from "react-daisyui";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant="outline" color="success">
        Primary
      </Button>
      {/* <Steps>
        <Steps.Step color="primary">Register</Steps.Step>
        <Steps.Step color="primary">Choose plan</Steps.Step>
        <Steps.Step>Purchase</Steps.Step>
        <Steps.Step>Receive Product</Steps.Step>
      </Steps>
      <Tabs>
        <Tabs.Tab value={0}>Tab 1</Tabs.Tab>
        <Tabs.Tab value={1}>Tab 2</Tabs.Tab>
        <Tabs.Tab value={2}>Tab 3</Tabs.Tab>
      </Tabs> */}
    </>
  );
}

export default App;
