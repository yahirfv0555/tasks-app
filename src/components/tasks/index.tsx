import { useLoaderProvider } from "@/providers/loader/loader-provider";
import IconButton from "@/shared/components/icon-button";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';

const Tasks: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();

    const [showInputs, setShowInputs] = useState<boolean>(false);

    const [title, setTitle] = useState<string>();
    const [value, setValue] = useState<string>();
    const [date, setDate] = useState<Date>();
    
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitle(value);
    }
    
    const handleValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValue(value);
    }
    
    const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDate(new Date(value));
    }

    const toggleShowInputs = () => {
        setShowInputs(prevShowInputs => !prevShowInputs);
    }

    return (
        <div className="flex flex-col py-20 px-40">

            <div className="flex flex-row justify-between">
                <h1>Pendientes</h1>
                <IconButton
                    icon={<IoAdd size={30} color="black"/>}
                    onClick={toggleShowInputs}
                />
            </div>
            <SlideDown>
                {showInputs === true && 
                    <div className="mt-5">
                        <div className="flex flex-row justify-between">
                            <Input
                                onChange={handleTitle}
                                value={title}
                                type="text"
                                label="Título"
                                className="w-[48%] mb-5"
                            />
                            
                            <Input
                                onChange={handleDate}
                                value={title}
                                type="date"
                                label="Fecha"
                                className="w-[48%] mb-5"
                            />
                        </div>
                        
                        <TextArea
                            onChange={handleValue}
                            value={value}
                            label="Descripción"
                            className="mb-5"
                        />

                    </div>
                }
            </SlideDown>

        </div>
    );
}

export default Tasks;