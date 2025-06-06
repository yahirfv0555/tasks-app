import { useEffect } from "react";
import { NoteDao, NoteDto } from "@/models/note";
import Button from "@/shared/components/button";

export interface ArchiveNotesDialogProps {
    archiveNote: () => Promise<void>;
    notesDao: NoteDao[];
    notesDto: NoteDto[];
}

const ArchiveNotesDialog: React.FC<ArchiveNotesDialogProps> = props => {
    const { archiveNote, notesDao, notesDto } = props;
    
    useEffect(() => {
        setNotesDao();
    }, []);

    const setNotesDao = () => {
        for (const noteDto of notesDto) {
            notesDao.push({ noteId: noteDto.noteId });
        }
    }

    const submit = async(): Promise<void> => {
        
        for (const noteDao of notesDao) {
            noteDao.active = false;
        }

        await archiveNote();

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

export default ArchiveNotesDialog;