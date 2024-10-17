import { useState } from "react";
import orderCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";

// react tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
  const categories = ['salad', 'pizza', 'soup','dessert','drinks'];
  const {category} = useParams();
  console.log('this is category',category);
  const initialIndex = categories.indexOf(category);
  console.log()
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  
  const dessert = menu.filter((item) => item.category.name === "Dessert");
  const soup = menu.filter((item) => item.category.name === "Soup");
  const pizza = menu.filter((item) => item.category.name === "Pizza");
  const drinks = menu.filter((item) => item.category.name === "Drinks");
  const salad = menu.filter((item) => item.category.name === "Salad");
  return (
    <div >
      
      <Cover img={orderCover} title="Order Food"></Cover>
      <Tabs className={" my-10 mx-auto"} defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel >
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
        {/* need to apply paigination in furure */}
      </Tabs>
    </div>
  );
};

export default Order;
