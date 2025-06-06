import { useEffect } from "react";
import { NoteDao, NoteDto } from "@/models/note";
import Button from "@/shared/components/button";

export interface DeleteNotesDialogProps {
    deleteNote: () => Promise<void>;
    notesDao: NoteDao[];
    notesDto: NoteDto[];
}

const DeleteNotesDialog: React.FC<DeleteNotesDialogProps> = props => {
    const { deleteNote, notesDao, notesDto } = props;
    
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

        await deleteNote();

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

export default DeleteNotesDialog;