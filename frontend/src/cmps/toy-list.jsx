// import PropTypes from 'prop-types';
// import { type } from "@testing-library/user-event/dist/type/index.js"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy, onToyDetails, addToCart, nums }) {
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <button className="remove-btn" onClick={() => { onRemoveToy(toy._id) }}>x</button>
                <ToyPreview toy={toy} />
                <div>
                    <button onClick={() => { onEditToy(toy) }}>Change price</button>
                    <button onClick={() => { onToyDetails(toy) }}>Details</button>
                </div>
                {/* 
                <button className="buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button> */}
            </li>)}
    </ul>
}


// ToyList.propTypes = {
//     txt(props, propName, cmp) {
//         if (typeof props.txt !== 'string') {
//             return new Error('Txt Not a String!')
//         }
//     },
//     nums: PropTypes.array,
//     // toys() {

//     // }
// }

// const obg = {
//     a:1,
//     func() {

//     },

// }


// ToyList.defaultProps = {
//     nums: [1, 2, 3 ,4]
// }