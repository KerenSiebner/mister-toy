import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'

import { loadReviews, addReview, removeReview } from '../store/review.actions.js'
import { loadUsers } from '../store/user.action'

export function Review({ toy }) {

  const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '', toyId: toy._id })

  useEffect(() => {
    loadReviews()
    loadUsers()
  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
    try {
      console.log('reviewToEdit', reviewToEdit)
      await addReview(reviewToEdit)
      // console.log('reviewToEdit', reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', aboutUserId: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  // function canRemove(review) {
  //   return review.userId === loggedInUser?._id || loggedInUser?.isAdmin
  // }

  // const isToyReview = (review.toyId===toy._id) ? true : false
  return (
    <div className="review-app">
      <h1>Toy Reviews</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {/* {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}*/}
            <p> 
              About:
              <Link to={`/user/${review.userId}`}>
                User name
                {/* {review.aboutUser.fullname} */}
              </Link>
            </p>
            <h3>{review.txt}</h3>
            <p>
              By:
              <Link to={`/user/${review.userId}`}>
                User name
                {/* {review.byUser.fullname} */}
              </Link>
            </p>
          </li>

        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddReview}>
          <select
            onChange={handleChange}
            value={reviewToEdit.aboutUserId}
            name="aboutUserId"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
            placeholder={`Tell us what you think of this ${toy.name}`}
          ></textarea>
          <button>Add</button>
        </form>}

      <hr />
    </div>
  )
}