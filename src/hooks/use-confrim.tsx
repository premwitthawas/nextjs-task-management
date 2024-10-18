import ResponsiveMoal from '@/components/responsive-modal';
import { Button, ButtonProps } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react'

const UseConfirm = (title: string, message: string, variant: ButtonProps['variant'] = 'default'): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
    const confrim = () => {
        return new Promise((resolve) => {
            setPromise({ resolve })
        })
    }
    const handleClose = () => {
        setPromise(null);
    }
    const handleConfrim = () => {
        promise?.resolve(true);
        handleClose();
    }
    const handleCancle = () => {
        promise?.resolve(false);
        handleClose()
    }
    const ConfrimationDialog = () => {
        return <ResponsiveMoal open={promise !== null} onOpenChange={handleClose}>
            <Card className='w-full h-full border-none shadow-none'>
                <CardContent className='pt-8'>
                    <CardHeader className='p-0'>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{message}</CardDescription>
                    </CardHeader>
                    <div className='pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end'>
                        <Button onClick={handleCancle} variant={'outline'} className='w-full lg:w-auto'>
                            Cancle
                        </Button>
                        <Button onClick={handleConfrim} variant={variant} className='w-full lg:w-auto'>
                            Confirm
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ResponsiveMoal>
    };
    return [ConfrimationDialog, confrim]
}

export default UseConfirm