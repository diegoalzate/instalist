import { useState } from "react"
import Input from "../components/shared/Input"
const List = () => {
    const [wish, setWish] = useState("")
    const [wishes, setWishes] = useState<String[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setWish(value)
    }
    const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        setWishes([...wishes, wish])
    }
    return (
        <div className="container flex flex-col justify-center">
            <h1 className="self-center my-4">my list</h1>
            <div className="self-center space-x-3">
                <Input handleChange={handleChange} wish={wish}/>
                <button className="rounded bg-red-400 py-1 px-4 text-gray-100" onClick={addItem}>add</button>
            </div>
            <section id="wishes">
                <ul>
                    {wishes.map(wish => (
                        <li>{wish}</li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default List