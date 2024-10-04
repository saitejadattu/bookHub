import './index.css'

import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

const BookItem = props => {
  const {eachBook} = props
  const {id, authorName, coverPic, rating, readStatus, title} = eachBook
  return (
    <Link to={`/books/${id}`} className="bookItem-container">
      <li className="bookItem-list-item-container ">
        <div className="bookItem-image-container">
          <img alt={title} src={coverPic} className="bookItem-image" />
        </div>
        <div className="bookItem-content-container">
          <h1 className="bookItem-content-heading">{title}</h1>
          <p className="bookItem-content-author-name">{authorName}</p>
          <p className="bookItem-content-avg-rating">
            Avg Rating{' '}
            <BsFillStarFill className="bookItem-content-star-symbol" />
            {'  '}
            {rating}
          </p>
          <p className="bookItem-content-status">
            Status:{'  '}
            <span className="bookItem-content-status-span">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookItem
