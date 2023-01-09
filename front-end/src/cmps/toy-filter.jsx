import Select from 'react-select'


import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"


export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    // onSetFilter = useRef(utilService.debounce(onSetFilter))
    // const elInputRef = useRef(null)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    // elInputRef.current.focus()
    // }, [])

    // useEffect(() => {
    //     // update father cmp that filters change very type
    //     onSetFilter.current(filterByToEdit)
    // }, [filterByToEdit])

    function handleChange({ target }) {
        // let { value, name: field, type } = target
        // value = (type === 'number') ? +value : value
        const field = target.name
        const value = target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    function handleClick({ target }) {
        // let { value, name: field, type } = target
        // value = (type === 'number') ? +value : value
        // console.log('checked?', target.checked)
        const field = target.name
        const value = target.checked
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    
    function handleLabelSelect({target}){
        // const field = target.name
        // const value = target.selectedOptions
        // console.log('value', value)
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    
    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const options = [
        { value: 'On wheels', label: 'On wheels' },
        { value: 'Box game', label: 'Box game' },
        { value: 'Art', label: 'Art' },
        { value: 'Baby', label: 'Baby' },
        { value: 'Doll', label: 'Doll' },
        { value: 'Puzzle', label: 'Puzzle' },
        { value: 'Outdoor', label: 'Outdoor' },
        { value: 'Battary Powered', label: 'Battary Powered' },
    ]

    return <section className="toy-filter full main-layout">
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name"></label>
            <input type="text"
                id="name"
                name="txt"
                placeholder="Search toy by name..."
                value={filterByToEdit.txt}
                onChange={handleChange}
            // ref={elInputRef}
            />
            <br /><br />
            <input type="checkbox" name = "inStock" onClick={handleClick}/>
            <label htmlFor="inStock">Show only in stock</label>

            <br /><br />
            <Select name="labels" options={options} isMulti onChange={handleLabelSelect}/>
            <button hidden>Filter</button>
        </form>

    </section>
}