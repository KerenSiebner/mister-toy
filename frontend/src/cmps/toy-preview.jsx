
export function ToyPreview({ toy }) {
    const path = "../../assets/img/pink.webp"
    return (
        <article>
            <h4>{toy.vendor}</h4>
            <div className={`toy-img ${toy.imgUrl}`}></div>
            {/* <img src={`https://images.pexels.com/photos/3573351/pexels-photo-3573351.png`} alt="" /> */}
            {/* <img src={path} alt="" /> */}
            <p>Name: <span>{toy.name}</span></p>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Labels: <span>{toy.labels}</span></p> */}
            {/* <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
        <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}

        </article>
    )
}