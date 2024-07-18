import React from "react";
import Layout from "../components/layout/layout";
// import { ChildNav } from "../components/header/ChildNav";
import { MainBanner } from "../components/banner/mainBanner";
import { Featureproducts } from "../components/featureProducts/featureProducts";
import { ShopByDiet } from "../components/shopByDiet/shopByDiet";
const Home = () => {
  return (
    <>
      <div>
        <Layout>
          {/* <ChildNav /> */}
          <MainBanner />
          <Featureproducts />
          <ShopByDiet />
        </Layout>
      </div>
    </>
  );
};

export default Home;
