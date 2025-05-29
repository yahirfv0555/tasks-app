"use client";

import Home from "@/components/home";
import PrivatePage from "@/routing/private-page";

export interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <PrivatePage>
      <Home/>
    </PrivatePage>
  );
}

export default  HomePage;