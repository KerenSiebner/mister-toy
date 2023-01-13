import { useNavigate, useParams } from "react-router-dom"
// const { Link } = ReactRouterDOM
export function ToyDetails({top, selectedToy,onToggleToyDetails}) {
    const { toyId } = useParams()
    // const navigate = useNavigate()

    function closeDetailsModal(){
        onToggleToyDetails()
    }


    return (
        <section className="toy-details">
            {top}
            <p>{selectedToy.name}</p>
            <p>Price:  ${selectedToy.price}</p>
            <p>Labels: {selectedToy.labels}</p>      
            <button onClick={closeDetailsModal}>Back</button>
        </section>
    )
}