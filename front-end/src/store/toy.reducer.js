
export const SET_TOYS = 'SET_TOYS'
// export const REMOVE_TOY = 'REMOVE_TOY'
// export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
// export const ADD_TOY = 'ADD_TOY'
// export const UPDATE_TOY = 'UPDATE_TOY'
// export const TOGGLE_CART_SHOWN = 'TOGGLE_CART_SHOWN'
// export const ADD_TO_CART = 'ADD_TO_CART'
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
// export const CLEAR_CART = 'CLEAR_CART'
export const SET_IS_LOADING = 'SET_IS_LOADING'




const initialState = {
    toys: [],
    // lastRemovedToy: null,
    isLoading: false,
    // isCartShown: false,
    // shoppingCart: [],
}


export function toyReducer(state = initialState, action) {
    let toys
    // let shoppingToyt
    // let lastRemovedToy

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        // case REMOVE_TOY:
        //     lastRemovedToy = state.toys.find(c => c._id === action.toyId)
        //     toys = state.toys.filter(c => c._id !== action.toyId)
        //     return { ...state, toys, lastRemovedToy }

        // case UNDO_REMOVE_TOY:
        //     ({ lastRemovedToy } = state)
        //     toys = [lastRemovedToy, ...state.toys]
        //     return { ...state, toys, lastRemovedToy: null }

        // case ADD_TOY:
        //     toys = [...state.toys, action.toy]
        //     return { ...state, toys }
        // case UPDATE_TOY:
        //     toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
        //     return { ...state, toys }

        // // Toyt
        // case TOGGLE_CART_SHOWN:
        //     return { ...state, isToytShown: !state.isToytShown }
        // case ADD_TO_CART:
        //     shoppingToyt = [...state.shoppingToyt, action.toy]
        //     return { ...state, shoppingToyt }
        // case REMOVE_FROM_CART:
        //     shoppingToyt = state.shoppingToyt.filter(c => c._id !== action.toyId)
        //     return { ...state, shoppingToyt }
        // case CLEAR_CART:
        //     return { ...state, shoppingToyt: [] }

        default:
            return state
    }
}


