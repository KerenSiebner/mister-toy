// const fs = require('fs');
// const PAGE_SIZE = 30000
// var toys = require('../../data/toy.json')
const dbService = require('../../services/db.service.js')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.servic.js')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { name:'', inStock: null}) {
// async function query(filterBy = { name: '' }) {
    try {
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' },
            // inStock: filterBy.inStock
        }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
    // if (!filterBy) return Promise.resolve(toys)
    // let filteredToys = toys
    // if (filterBy.name) {
    //     const regex = new RegExp(filterBy.name, 'i')
    //     filteredToys = toys.filter(toy => regex.test(toy.name))
    // }
    // if (filterBy.inStock === 'true') {
    //     filteredToys = toys.filter(toy => toy.inStock)
    // }
    // // if(filterBy.labels){
    // //     toys = toys.filter(toy => toy.labels.include(filterBy.labels))
    // // }
    // return Promise.resolve(filteredToys)
}

async function get(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.findOne({_id: ObjectId(toyId)})
        return toyId
    } catch (err) {
        logger.error(`cannot get toy ${toyId}`, err)
        throw err
    }
    // const toy = toys.find(toy => toy._id === toyId)
    // if (!toy) return Promise.reject('Toy not found')
    // return Promise.resolve(toy)
}

async function remove(toyId) {
    try{
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({_id: ObjectId(toyId)})
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
    // const idx = toys.findIndex(toy => toy._id === toyId)
    // if (idx === -1) return Promise.reject('No Such Toy')
    // const toy = toys[idx]
    // // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')
    // toys.splice(idx, 1)
    // return _writeToysToFile()
}


async function save(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err){
        logger.error('cannot add toy', err)
        throw err
    }
    // if (toy._id) {
    //     const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
    //     if (!toyToUpdate) return Promise.reject('No such Toy')
    //     // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Toy')

    //     toyToUpdate.vendor = toy.vendor
    //     toyToUpdate.speed = toy.speed
    // } else {
    //     toy._id = _makeId()
    //     toy.owner = loggedinUser
    //     toys.push(toy)
    // }
    // return _writeToysToFile().then(() => toy)
}



module.exports = {
    query,
    get,
    remove,
    save
}



// function _writeToysToFile() {
//     return new Promise((res, rej) => {
//         const data = JSON.stringify(toys, null, 2)
//         fs.writeFile('data/toy.json', data, (err) => {
//             if (err) return rej(err)
//             // console.log("File written successfully\n");
//             res()
//         });
//     })
// }