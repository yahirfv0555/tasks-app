"use client";

import Home from "@/components/home";
import PrivatePage from "@/routing/private-page";

const HomePage: React.FC = () => {
  return (
    <PrivatePage>
      <Home/>
    </PrivatePage>
  );
}

export default  HomePage;