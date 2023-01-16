const toyService = require('./toy.service.js')

const logger = require('../../services/logger.service')

async function getToys(req, res) {
  try {
    logger.debug('Getting Toys')
    const inStock = (req.query.inStock==='true')? true : false
    const filterBy = { name: req.query.name || '', inStock: inStock}
    console.log('req.query', req.query)
    // if (inStock) {
    //   const filterBy={ ...filterBy, inStock: req.query.inStock }
    // }
    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    logger.error('Failed to get toys', err)
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

//previously in server:
// app.get('/api/toy', (req, res) => {
//   const { filterBy } = req.query.params
//   console.log('filterBy', filterBy)
//   toyService.query(filterBy)
//       .then((toys) => {
//           res.send(toys)
//       })
//       .catch(err => {
//           console.log('Error:', err)
//           res.status(400).send('Cannot get toys')
//       })
// })

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    const toy = await toyService.get(toyId)
    res.json(toy)
  } catch (err) {
    logger.error('Failed to get toy', err)
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

//previously in server:

// Read - GetById
// app.get('/api/toy/:toyId', (req, res) => {
//   const { toyId } = req.params
//   toyService.get(toyId)
//     .then((toy) => {
//       res.send(toy)
//     })
//     .catch(err => {
//       console.log('Error:', err)
//       res.status(400).send('Cannot get toy')
//     })
// })

async function addToy(req, res) {
  // const {loggedinUser} = req
  try {
    const toy = req.body
    // toy.owner = loggedinUser
    const addedToy = await toyService.save(toy)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add toy', err)
    res.status(500).send({ err: 'Failed to add toy' })
  }
}

// Previously in server: Create
// app.post('/api/toy', (req, res) => {
//   const toy = req.body
//   toyService.save(toy)
//     .then((savedToy) => {
//       res.send(savedToy)
//     })
//     .catch(err => {
//       console.log('Error:', err)
//       res.status(400).send('Cannot create toy')
//     })
// })


async function updateToy(req, res) {
  try {
    const toy = req.body
    const updatedToy = await toyService.update(toy)
    res.json(updatedToy)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

// Update prev in server
// app.put('/api/toy', (req, res) => {
//   const toy = req.body
//   toyService.save(toy)
//       .then((savedToy) => {
//           res.send(savedToy)
//       })
//       .catch(err => {
//           console.log('Error:', err)
//           res.status(400).send('Cannot update toy')
//       })
// })

async function removeToy(req, res) {
  try {
    const toyId = req.params.id
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy', err)
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

// Remove previously in server
// app.delete('/api/toy/:toyId', (req, res) => {

//   const { toyId } = req.params
//   toyService.remove(toyId)
//     .then(() => {
//       res.send({ msg: 'Toy removed successfully', toyId })
//     })
//     .catch(err => {
//       console.log('Error:', err)
//       res.status(400).send('Cannot delete toy')
//     })
// })

async function addToyMsg(req, res) {
  // const {loggedinUser} = req
  try {
    const toyId = req.params.id
    const msg = {
      txt: req.body.txt,
      // by: loggedinUser
    }
    const savedMsg = await toyService.addToyMsg(toyId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update toy', err)
    res.status(500).send({ err: 'Failed to update toy' })

  }
}

async function removeToyMsg(req, res) {
  // const {loggedinUser} = req
  try {
    const toyId = req.params.id
    const { msgId } = req.params

    const removedId = await toyService.removeToyMsg(toyId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove toy msg', err)
    res.status(500).send({ err: 'Failed to remove toy msg' })

  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  addToyMsg,
  removeToyMsg
}




