// import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/user.reducer.js'
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'
import { logout } from '../store/user.action.js'

// import { LoginSignup } from '../pages/login-signup'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

export function AppHeader() {

    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            {user && <section className="user-fullname">
                <button onClick={onLogout}>Logout</button>
                <p>Welcome {user.fullname}</p>
            </section>}

            {!user && <section className="user-info">
                <Link to="/user" className='link'>Login</Link>
            </section>}
        </header>
    )
}

