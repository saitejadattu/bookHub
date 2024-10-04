import './index.css'
import {useState, useEffect} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Footer from '../Footer'

import Navbar from '../Navbar'

const renderInitialization = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookDetailedView = props => {
  const [bookDetails, setBookDetails] = useState()
  const [initialStatus, setInitialStatus] = useState(
    renderInitialization.initial,
  )
  const {match} = props
  const {params} = match
  const {id} = params

  const fetchData = async () => {
    setInitialStatus(renderInitialization.loading)
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      setBookDetails(updateData)
      setInitialStatus(renderInitialization.success)
    } else {
      setInitialStatus(renderInitialization.failure)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const renderBook = () => {
    return (
      <div className="bookdetailedview-container">
        <div className="bookdetailedview-book-details-container-desktop bookdetailedview-book-details-container-mobile">
          <div className="bookdetailedview-book-details-desktop bookdetailedview-book-details-mobile">
            <div className="bookdetailedview-book-image-container">
              <img
                alt={bookDetails.title}
                src={bookDetails.coverPic}
                className="bookdetailedview-book-image"
              />
            </div>
            <div className="bookdetailedview-book-content-container">
              <h1 className="bookdetailedview-book-title-desktop bookdetailedview-book-title-mobile">
                {bookDetails.title}
              </h1>
              <p className="bookdetailedview-book-authorName-desktop bookdetailedview-book-authorName-mobile">
                {bookDetails.authorName}
              </p>
              <p className="bookdetailedview-book-rating-desktop bookdetailedview-book-rating-mobile">
                Avg Rating:{' '}
                <BsFillStarFill className="bookdetailedview-book-star-icon" />
                {`  `} {bookDetails.rating}
              </p>
              <p className="bookdetailedview-book-status-desktop bookdetailedview-book-status-mobile">
                Status:{'  '}
                <span className="bookdetailedview-book-readStatus-desktop bookdetailedview-book-readStatus-mobile">
                  {bookDetails.readStatus}
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="bookdetailedview-book-about-author-container">
            <h1 className="bookdetailedview-book-about-author-desktop bookdetailedview-book-about-author-mobile">
              About Author
            </h1>
            <p className="bookdetailedview-book-about-para-desktop bookdetailedview-book-about-para-mobile">
              {bookDetails.aboutAuthor}
            </p>
            <h1 className="bookdetailedview-book-about-author-desktop bookdetailedview-book-about-author-mobile">
              About Book
            </h1>
            <p className="bookdetailedview-book-about-para-desktop bookdetailedview-book-about-para-mobile">
              {bookDetails.aboutBook}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const failureView = () => {
    return (
      <div className="failureView-container-desktop failureView-container-mobile">
        <img
          alt="failure view"
          className="failureView-image-desktop failureView-image-mobile"
          src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727948960/somthingwent_wrong_jvkvyi.jpg"
        />
        <p className="failureView-para-desktop failureView-para-mobile">
          Something went wrong, Please try again.
        </p>
        <button
          className="failureView-button"
          onClick={() => handleSearch(activeBtn)}
        >
          Try Again
        </button>
      </div>
    )
  }
  const loadingView = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  const renderBooks = () => {
    switch (initialStatus) {
      case renderInitialization.success:
        return renderBook()
      case renderInitialization.failure:
        return failureView()
      case renderInitialization.loading:
        return loadingView()
      default:
        return ''
    }
  }
  return (
    <div>
      <Navbar />
      {renderBooks()}
    </div>
  )
}
export default BookDetailedView
