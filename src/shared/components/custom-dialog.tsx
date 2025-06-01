

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';
import Button from './button';
import IconButton from './icon-button';
import { IoClose } from 'react-icons/io5';

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
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-white p-6 rounded">
                        <div className='w-full flex flex-row justify-between'>
                            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                            <IconButton onClick={() => setIsOpen(false)} icon={<IoClose size={30} color="black"/>} className='ml-auto mr-0'/>
                        </div>
                        {children}
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default CustomDialog;
