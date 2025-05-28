"use client"

import { useState, useEffect } from 'react'
import './FilterSearch.css'


const ItemList = [
    "Swain",
    "Ryze",
    "Jayce",
    "Kennen",
    "Ashe",
    "Ezrael",
    "Diana",
    "Dr. Mundo",
    "Nasus",
    "Camille",
    "Ahri",
    "Neeko",
    "Lux",
    "Galio",
    "Twisted Fate",
    "Gragas",
    "Lucian",
    "Caitlyn",
    "Ekko",
    "Smolder",
    "Tristana",
    "Volibear",
    "Nautilus"
]

const useDebounce = (list: string[], delay: number) => {
    const [debounce, setDebounce] = useState<string[]>(list)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(list)
        }, delay)
        return () => {
            clearTimeout(timer);
        }
    }, [list, delay])

    return debounce
}

const FilterSearch = () => {
    const [items, setItems] = useState<string[]>([])
    const [inputText, setInputText] = useState("")
    const debouncedItems = useDebounce(items, 100)



    useEffect(() => {
        if (inputText.length > 0) {
            setItems(updateItemList())
        } else {
            setItems([])
        }
    }, [inputText])

    function updateItemList() {
        return ItemList.filter(item => item.toLowerCase().startsWith(inputText.toLowerCase()))
    }
    return (
        <div className="inputComponent">
            <label>Input:</label>
            <input
            className="inputField"
            onChange={(e) => setInputText(e.target.value)}
            type="text"
            value={inputText}/>
            <section className="filteredList">
            {debouncedItems.map(item => 
            <p 
            key={item}
            onClick={() => setInputText(item)}>
                {item}
            </p>)}
            </section>
        </div>
    )
}

export default FilterSearch