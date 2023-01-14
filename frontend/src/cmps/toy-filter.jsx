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
    const [selectedLabel, setSelectedLabel] = useState([])

    useEffect(() => {
        console.log('selectedLabel', selectedLabel)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit,setSelectedLabel])

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
    
    function handleLabelSelect(){
        setSelectedLabel(selectedLabel)
        console.log('filterByToEdit.labels', filterByToEdit.labels)
        console.log('selectedLabel', selectedLabel)
        // const newLabels = filterByToEdit.labels.push(selectedLabel)
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: newLabels }))
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
        <form className='main-toy-form'>
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
            <Select name="labels" options={options}
            value={selectedLabel}
            isMulti onChange={setSelectedLabel}/>
            {/* isMulti onChange={handleLabelSelect}/> */}
            <br />
            <input type="checkbox" name = "inStock" id="inStock" onClick={handleClick}/>
            <label htmlFor="inStock">Show only in stock</label>
            <button hidden>Filter</button>
        </form>

    </section>
}