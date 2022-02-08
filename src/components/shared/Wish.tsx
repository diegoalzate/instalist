import { XIcon } from '@heroicons/react/outline'
import { IWish } from '../../pages/List'

interface IWishProps {
  wish: IWish
  deleteHandler: (wish: IWish) => void
}

const Wish = ({ wish, deleteHandler }: IWishProps) => {
  return (
    <div className="flex flex-col space-y-2 mb-2 rounded border-2 p-2 w-72 sm:w-96">
      <XIcon className="max-h-4 self-end hover:text-red-400 " onClick={() => {deleteHandler(wish)}}/>
      <h1 className="text-lg text-gray-800">{wish.wish}</h1>
      <a href={wish.url} target="_blank" rel="noreferrer" className="text-sm">
        {wish.url}
      </a>
    </div>
  )
}

export default Wish
