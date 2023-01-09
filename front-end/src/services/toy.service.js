
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}


// function query(filterBy = getDefaultFilter()) {
//     const queryParams = `?name=${filterBy.txt}&inStock=${filterBy.inStock}`
//     return httpService.get(BASE_URL + queryParams)
// }

function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }
            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock)
            }
            return toys
        })
}



function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    // return httpService.delete(BASE_URL + toyId)
    return storageService.remove(STORAGE_KEY,toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
        // return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
        // return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { name: '', inStock: null }
}
function getEmptyToy() {
    return {
        name: '',
        price: 0,
    }
}

function getRandomToy() {
    return {
        name: 'Toy',
        price: utilService.getRandomIntInclusive(10, 200),
        label: '',
        createdAt: Date.now(),
        inStock: true,
    }
}
function _createToys(){
    let toys=[
        {
            "_id": utilService.makeId(),
            "name": "Talking Doll",
            "price": 123,
            "labels": ["Doll", "Battery Powered", "Baby"],
            "createdAt": Date.now(),
            "inStock": true
        }, {
            "_id": utilService.makeId(),
            "name": "Frozen Puzzle",
            "price": 25,
            "labels": ["Puzzle", "Princess", "Girls"],
            "createdAt": Date.now(),
            "inStock": true 
        } , {
            "_id": utilService.makeId(),
            "name": "Guitar",
            "price": 99,
            "labels": ["Musical", "Battery Powered"],
            "createdAt": Date.now(),
            "inStock": true
        }, {
            "_id": utilService.makeId(),
            "name": "Paint Kit",
            "price": 99,
            "labels": ["Art", "Box Game"],
            "createdAt": Date.now(),
            "inStock": false          
        }
    ]

    utilService.saveToStorage(STORAGE_KEY, toys)
    return toys
}

// function _createToy() {
//     return (

//     )
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


