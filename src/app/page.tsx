import Home from "@/components/home";
import ProtectedPage from "@/routing/protected-page";

export interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <ProtectedPage>
      <Home/>
    </ProtectedPage>
  );
}

export default  HomePage;