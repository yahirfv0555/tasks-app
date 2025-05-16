import Link from "next/link";

export interface MenuItemProps {
    name: string;
    route: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
    const { name, route } = props;

    return (
        <Link 
            href={route} 
            className="text-white h-[10rem] bg-blue-400"
        >
            <div
                className="bg-black rounded p-5"
            >
                {name}
            </div>
        </Link>
    );
}

export default MenuItem;