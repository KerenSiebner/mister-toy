
export function ToyPreview({ toy }) {
    return (

        <article>
            <h4>{toy.vendor}</h4>
            <h1>🧸</h1>
            <p>Name: <span>{toy.name}</span></p>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
        <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}

        </article>
    )
}