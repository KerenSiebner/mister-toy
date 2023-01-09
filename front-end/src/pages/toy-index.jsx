import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyDetails } from '../cmps/toy-details.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'
import { useState } from 'react'


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const [selectedToy, setSelectedToy] = useState(null)

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                showSuccessMsg('Toys loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function onToyDetails(toy) {
        setSelectedToy(toy)
    }

    function onToggleToyDetails() {
        setSelectedToy(null)
    }

    function setFilter(filterBy) {
        onLoadToys(filterBy)
    }

    return <section>
        <h1>Toy Store</h1>
        {selectedToy && <ToyDetails
            selectedToy={selectedToy}
            top={<h2>Toy Details</h2>}
            onToggleToyDetails={onToggleToyDetails}
        />}
        <button onClick={onAddToy}>Add random toy</button>
        <ToyFilter onSetFilter={setFilter} />
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            onToyDetails={onToyDetails}
        // addToToyt={addToToyt}
        />
    </section>
}