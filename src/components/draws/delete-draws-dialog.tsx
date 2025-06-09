import { useEffect } from "react";
import { DrawDao, DrawDto } from "@/models";
import Button from "@/shared/components/button";

export interface DeleteDrawsDialogProps {
    deleteDraw: () => Promise<void>;
    drawsDao: DrawDao[];
    drawsDto: DrawDto[];
}

const DeleteDrawsDialog: React.FC<DeleteDrawsDialogProps> = props => {
    const { deleteDraw, drawsDao, drawsDto } = props;
    
    useEffect(() => {
        setDrawsDao();
    }, []);

    const setDrawsDao = () => {
        for (const drawDto of drawsDto) {
            drawsDao.push({ drawId: drawDto.drawId });
        }
    }

    const submit = async(): Promise<void> => {
        
        for (const drawDao of drawsDao) {
            drawDao.active = false;
        }

        await deleteDraw();

    }

    return (
        <div className="mt-5 h-[20dvh] w-[20dvw] flex flex-col justify-between">
            <div>
                {'¿Estás seguro de querer eliminar lo seleccionado?'}
            </div>
            
            <Button
                label="Eliminar"
                className="bg-red-400 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default DeleteDrawsDialog;