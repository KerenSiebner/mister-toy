import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { SET_TOYS , SET_IS_LOADING, REMOVE_TOY, ADD_TOY, UPDATE_TOY} from './toy.reducer.js'

export function loadToys(filterBy) {
    console.log('filterBy', filterBy)
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

export function saveToy(toy) {
    console.log('toy', toy)
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    console.log('type', type)
    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy', savedToy)
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}