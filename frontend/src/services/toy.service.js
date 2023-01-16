import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    
    getRandomToy,
    getDefaultFilter
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy = getDefaultFilter()) {   
    // console.log('filterBy', filterBy)
    return httpService.get('toy', filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { name: '', inStock: null, labels: [] }
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
        label: [labels[utilService.getRandomIntInclusive(0,7)]],
        createdAt: Date.now(),
        inStock: true,
    }
}



// function _createToys(){
//     let toys=[
//         {
//             "_id": utilService.makeId(),
//             "name": "Talking Doll",
//             "price": 123,
//             "labels": ["Doll", "Battery Powered", "Baby"],
//             "createdAt": Date.now(),
//             "inStock": true
//         }, {
//             "_id": utilService.makeId(),
//             "name": "Frozen Puzzle",
//             "price": 25,
//             "labels": ["Puzzle", "Princess", "Girls"],
//             "createdAt": Date.now(),
//             "inStock": true 
//         } , {
//             "_id": utilService.makeId(),
//             "name": "Guitar",
//             "price": 99,
//             "labels": ["Musical", "Battery Powered"],
//             "createdAt": Date.now(),
//             "inStock": true
//         }, {
//             "_id": utilService.makeId(),
//             "name": "Paint Kit",
//             "price": 99,
//             "labels": ["Art", "Box Game"],
//             "createdAt": Date.now(),
//             "inStock": false          
//         }
//     ]

//     utilService.saveToStorage(STORAGE_KEY, toys)
//     return toys
// }

// function _createToy() {
//     return (

//     )
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


