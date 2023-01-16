import {Review} from './review'

import { useNavigate, useParams } from "react-router-dom"
import {ChatRoom} from './chat-room'
// const { Link } = ReactRouterDOM
export function ToyDetails({top, selectedToy,onToggleToyDetails}) {
    // const { toyId } = useParams()
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
            <Review selectedToy={selectedToy}/>
            <ChatRoom selectedToy={selectedToy}/>

            <button onClick={closeDetailsModal}>Back</button>
        </section>
    )
}