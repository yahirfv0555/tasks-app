import Image from "next/image";
import { AppRoute } from "@/models";
import ExpandableFab from "./expandable-fab";
import Link from "next/link";

export interface ModuleTemplateProps {
    route: AppRoute;
    children: React.ReactNode;
    actions: React.ReactElement[];
    openCreateDialog: () => void;
}

const ModuleTemplate: React.FC<ModuleTemplateProps> = props => {
    const { route, children, actions, openCreateDialog } = props;
    
    return (
        <div className="w-full h-full bg-gray-100 pt-10 px-30">
            <div className="fixed bottom-10 right-10 z-50 h-auto">
                <ExpandableFab
                    iconButtons={actions}
                />
            </div>
            <div className="flex flex-row justify-between px-10 py-5 rounded-t-2xl bg-white">
                <div className="flex flex-row items-end justify-between w-full h-full">
                    <div className="flex flex-row justify-start">
                        <h1 className="flex flex-col justify-center text-white bg-orange-300 rounded-l-md py-1 px-4 shadows">
                            <span>
                                <Link 
                                    href={'/'}  
                                    className="cursor-pointer"
                                >
                                    {'Inicio > '}
                                </Link>
                                <span>{route.name}</span>
                            </span>
                        </h1>
                        <div className="flex flex-row justify-end items-center px-2 py-1 rounded-r-md bg-orange-300 border-l-2 border-white cursor-pointer hover:bg-blue-300">
                            <Image
                                src={route.imagePath.replaceAll('.png', '-white.png')}
                                width={30}
                                height={30}
                                className="" 
                                onClick={openCreateDialog}
                                alt={"Agregar "+route.name.replaceAll('s' ,'')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[0.25rem] bg-gray-100 rounded-4xl"/>

            <div className="flex flex-col p-10 bg-white flex-1">
                {children} 
            </div>
        </div>
    );
}

export default ModuleTemplate;