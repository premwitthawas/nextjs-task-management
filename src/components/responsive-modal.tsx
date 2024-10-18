import { useMedia } from 'react-use';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import React from 'react';

interface Props {
    children: React.ReactNode,
    open: boolean;
    onOpenChange?: (open: boolean) => void;
}
const ResponsiveMoal = ({ children, onOpenChange, open }: Props) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);
    if (isDesktop) {
        return <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <DialogTitle />
                <DialogDescription />
            </DialogHeader>
            <DialogContent className='w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]'>
                {children}
            </DialogContent>
        </Dialog>
    }

    return <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerHeader>
            <DrawerTitle />
            <DrawerDescription />
        </DrawerHeader>
        <DrawerContent>
            <div className='overflow-y-auto hide-scrollbar max-h-[85vh]'>
                {children}
            </div>
        </DrawerContent>
    </Drawer>
}

export default ResponsiveMoal