import Explore from "../components/Explore";
import Create from "../components/Create";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title="Bank Recycle Waste" />
      <Layout>
        <Hero />
        <Explore />
        <Create />
      </Layout>
    </>
  );
}
