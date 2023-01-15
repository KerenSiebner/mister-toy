// import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    remove,
    update,
    changeScore
}

window.us = userService

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login(credentials) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === credentials.username)
    // const user = await httpService.post('auth/login', credentials)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(credentials) {
    credentials.score = 10000
    // if (!credentials.imgUrl) credentials.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', credentials)
    // const user = await httpService.post('auth/signup', credentials)
    // socketService.login(user._id)
    return saveLocalUser(user)
    // const user = { username, password, fullname }
    // return httpService.post(BASE_URL + 'signup', user)
    //     .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)

    // return httpService.post(BASE_URL + 'logout')
    //     .then(() => {
    //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    //     })
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    console.log('_id', _id)
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})

(async () => {
    await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123', score: 10000, isAdmin: false })
    await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', score: 10000, isAdmin: true })
    await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123', score: 10000 })
})()

