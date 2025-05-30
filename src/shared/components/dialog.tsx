

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

export interface CustomDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    children: ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = props => {
    const { isOpen, setIsOpen, title, children } = props;
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Abrir diálogo</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white p-6 rounded">
                    <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                    {children}
                    <button onClick={() => setIsOpen(false)}>Cerrar</button>
                </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default CustomDialog;
