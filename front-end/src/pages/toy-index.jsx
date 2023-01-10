import { useDispatch, useSelector } from 'react-redux'
import { Link,  useSearchParams } from 'react-router-dom'


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
    // const [searchParams, setSearchParams] = useSearchParams()
    // const queryFilterBy = carService.getFilterFromSearchParams(searchParams)

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
        <div className='toy-intro'>
        <h1>Shop Toys!</h1>
        <p>Adventure in for playtime's best! Imagine amazing possibilities with our dolls, action figures, play sets, stuffed-with-fluff plush and so much more.</p>
        </div>
        {selectedToy && <ToyDetails
            selectedToy={selectedToy}
            top={<h2>Toy Details</h2>}
            onToggleToyDetails={onToggleToyDetails}
        />}
        <ToyFilter onSetFilter={setFilter} />
        <button className='add-toy-btn' onClick={onAddToy}>Add random toy</button>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            onToyDetails={onToyDetails}
        // addToToyt={addToToyt}
        />
    </section>
}