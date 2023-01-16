import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { SET_TOYS, SET_IS_LOADING, REMOVE_TOY, ADD_TOY, UPDATE_TOY } from './toy.reducer.js'

export async function loadToys(filterBy) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Had issues loading toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('Had issues Removing toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    // console.log('toy', toy)
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    // console.log('type', type)
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}