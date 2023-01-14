import { Link } from 'react-router-dom'
import { SET_USER } from '../store/user.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { signup, login } from '../store/user.action.js'


function getEmptyCredentials() {
    return {
        email: '',
        password: '',
        fullname: ''
    }
}

export function LoginSignup() {
    const user = useSelector((storeState => storeState.userModule.user))
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)


    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }


    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const func= isSignupState ? signup : login
        return func(credentials)
        .then ((user)=>{
            showSuccessMsg('Welcome!')
        }).catch (err=>{
            showErrorMsg('try again')
        })
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { email, password, fullname } = credentials

    return <section className='login-section'>
        <h2>{isSignupState ? 'Sign up' : 'Log in'}</h2>
        <h3>Mister Toy</h3>
        <form className='login-form' action="submit" onSubmit={onSubmit}>
            <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={handleCredentialsChange}
                required
            />
            <input
                type="text"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={handleCredentialsChange}
                required
            />

            {isSignupState && <input
                type="text"
                name="fullname"
                value={fullname}
                placeholder="Full name"
                onChange={handleCredentialsChange}
                required
            />}

            <button>Continue</button>

        </form>
        <div className="btns">
            <a href="#" onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
            </a >
        </div>
    </section>
}