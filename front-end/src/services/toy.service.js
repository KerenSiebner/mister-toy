
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
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { name: '', inStock: true }
}
function getEmptyToy() {
    return {
        name: '',
        price: 0,
    }
}

function getRandomToy() {
    return {
        name: '',
        inStock: true,
        label: '',
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}
function _createToys(){
    let toys=[]
    toys.push(_createToy())
    toys.push(_createToy())
    toys.push(_createToy())
    utilService.saveToStorage(STORAGE_KEY, toys)
    return toys
}

function _createToy() {
    return (
        {
            "_id": utilService.makeId(),
            "name": "Talking Doll",
            "price": 123,
            "labels": ["Doll", "Battery Powered", "Baby"],
            "createdAt": 1631031801011,
            "inStock": true
        }
    )
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


