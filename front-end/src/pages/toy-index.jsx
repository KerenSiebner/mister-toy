import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {ToyList} from '../cmps/toy-list.jsx'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'


export function ToyIndex(){
    const toys = useSelector((storeState)=>storeState.toyModule.toys)

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

    return <section>
        <p>Toy Store</p>
        <ToyList
                toys={toys}
                // onRemoveToy={onRemoveToy}
                // onEditToy={onEditToy}
                // addToToyt={addToToyt}
            />
    </section>
}