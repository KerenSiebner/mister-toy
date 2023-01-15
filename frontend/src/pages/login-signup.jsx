import { Link } from 'react-router-dom'
// import { SET_USER } from '../store/user.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

import { ImgUploader } from '../cmps/img-upload'
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { signup, login } from '../store/user.action.js'

export function LoginSignup() {
    // const user = useSelector((storeState => storeState.userModule.user))
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)


    // const dispatch = useDispatch()

    // function setUser(user) {
    //     dispatch({ type: SET_USER, user })
    // }
    function getEmptyCredentials() {
        return {
            username: '',
            password: '',
            fullname: ''
        }
    }

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function onSubmit(ev) {
        console.log('ev', ev)
        ev.preventDefault()
        const func= isSignupState ? signup : login
        console.log('credentials', credentials)

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

    const onUploaded = (imgUrl) => {
        setCredentials({ ...credentials, imgUrl })
    }

    const { username, password, fullname } = credentials

    return <section className='login-section'>
        <h2>{isSignupState ? 'Sign up' : 'Log in'}</h2>
        <h3>Mister Toy</h3>
        <form className='login-form' action="submit" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter username"
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
            />
        }
        <ImgUploader onUploaded={onUploaded}/>                    
            <button>Continue</button>

        </form>
        <div className="btns">
            <button onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
            </button >
        </div>
    </section>
}