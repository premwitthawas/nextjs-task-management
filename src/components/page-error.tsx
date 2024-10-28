import { AlertTriangleIcon } from 'lucide-react'
import React from 'react'
interface Props {
    message: string;
}
export const PageError = ({ message }: Props) => {
    return (
        <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
            <AlertTriangleIcon className="size-6" />
            <p className="text-sm">{message}</p>
        </div>
    )
}

