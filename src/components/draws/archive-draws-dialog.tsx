import { useEffect } from "react";
import Button from "@/shared/components/button";
import { DrawDao, DrawDto } from "@/models";

export interface ArchiveDrawsDialogProps {
    archiveDraw: () => Promise<void>;
    drawsDao: DrawDao[];
    drawsDto: DrawDto[];
}

const ArchiveDrawsDialog: React.FC<ArchiveDrawsDialogProps> = props => {
    const { archiveDraw, drawsDao, drawsDto } = props;
    
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

        await archiveDraw();

    }

    return (
        <div className="mt-5 h-[20dvh] w-[20dvw] flex flex-col justify-between">
            <div>
                {'¿Estás seguro de querer archivar lo seleccionado?'}
            </div>
            
            <Button
                label="Archivar"
                className="bg-orange-300 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default ArchiveDrawsDialog;