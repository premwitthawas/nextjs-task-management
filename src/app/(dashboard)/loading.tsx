import { Loader2Icon } from 'lucide-react'

const DashBoardLoading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <Loader2Icon className='size-6 animate-spin text-muted-foreground'/>
    </div>
  )
}

export default DashBoardLoading