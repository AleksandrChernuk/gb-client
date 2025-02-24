import { X } from 'lucide-react'

export const ClearInputButton = ({ handleClear }: { handleClear: () => void }) => {
  return (
    <div
      className='absolute right-0 inline-flex w-10 h-10 p-2 -translate-y-1/2 rounded-lg cursor-pointer top-1/2'
      onClick={(e) => {
        e.stopPropagation()
        handleClear()
      }}
    >
      <X size={24} className='stroke-icons' />
    </div>
  )
}
