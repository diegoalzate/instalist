import { XIcon } from '@heroicons/react/outline'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { Item } from '../../types'


const Wish = ({name, url, id, list_id}: Item) => {
  const {mutate} = useDeleteItem()
  return (
    <div className="flex flex-col space-y-2 mb-2 rounded border-2 p-2 w-72 sm:w-96">
      <XIcon className="max-h-4 self-end hover:text-red-400 " onClick={() => {mutate({id, listId: list_id})}}/>
      <h1 className="text-lg text-gray-800">{name}</h1>
      <a href={url} target="_blank" rel="noreferrer" className="text-sm">
        {url}
      </a>
    </div>
  )
}

export default Wish
