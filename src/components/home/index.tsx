import { AppRoute } from "@/models/general";
import routes from "@/core/config/routes";
import MenuItem from "./menu-item";

const Home: React.FC = () => {

    return (
        <div className="grid grid-cols-3 gap-10 p-10 w-full">
            {
                routes.map((appRoute: AppRoute, index: number) => (
                    <MenuItem
                        key={index}
                        route={appRoute.route}
                        name={appRoute.name}
                    />
                ))
            }
        </div>
    );
}

export default Home;