import Select from 'react-select'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
// import { utilService } from "../services/util.service.js"

const SearchSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(7, 'Too Long!')
});

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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
        <form>
            <label htmlFor="name"></label>
            <input type="text"
            className="filter-txt"
                id="name"
                name="name"
                placeholder="Search toy by name..."
                value={filterByToEdit.name}
                onChange={handleChange}
            // ref={elInputRef}
            />

            <br /><br />
            <Select name="labels" options={options} isMulti onChange={handleLabelSelect}/>
            <br />
            <input type="checkbox" name = "inStock" onClick={handleClick}/>
            <label htmlFor="inStock">Show only in stock</label>
            <button hidden>Filter</button>
        </form>

    </section>
}