import './index.css'
import {useState, useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import BookItem from '../BookItem'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Buttons from '../Buttons'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const renderInitialization = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const renderInitializationBooks = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Bookshelves = () => {
  const [activeBtn, setActiveBtn] = useState(bookshelvesList[0].id)
  const [searchText, setSerachText] = useState('')
  const [searchList, setSearchList] = useState([])
  const [initialStatus, setInitialStatus] = useState(
    renderInitialization.initial,
  )
  const [initialStatusBooks, setInitialStatusBooks] = useState(
    renderInitializationBooks.initial,
  )
  const handleActiveBtn = id => {
    setActiveBtn(id)
    handleSearch(id)
  }
  const handleInput = e => {
    setSerachText(e.target.value)
  }
  let activeHead = bookshelvesList.find(eachItem => eachItem.id === activeBtn)
  const handleSearchForBooksContainer = async () => {
    setInitialStatusBooks(renderInitializationBooks.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${'ALL'}&search=${''}`
    // console.log(url)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updateData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        readStatus: each.read_status,
        id: each.id,
        rating: each.rating,
        title: each.title,
      }))
      setInitialStatusBooks(renderInitializationBooks.success)
      setSearchList(updateData)
      if (updateData.length) {
        setSerachText('')
      }
    } else {
      setInitialStatusBooks(renderInitializationBooks.failure)
    }
  }
  const handleSearch = async id => {
    setInitialStatus(renderInitialization.loading)
    activeHead = bookshelvesList.find(eachItem => eachItem.id === id)
    const activeValue = activeHead.value
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeValue}&search=${searchText}`
    // console.log(url)
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    if (response.ok === true) {
      const updateData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        readStatus: each.read_status,
        id: each.id,
        rating: each.rating,
        title: each.title,
      }))
      setInitialStatus(renderInitialization.success)
      setSearchList(updateData)
      if (updateData.length) {
        setSerachText('')
      }
    } else {
      setInitialStatus(renderInitialization.failure)
    }
  }
  useEffect(() => {
    handleSearchForBooksContainer()
    handleSearch(activeBtn)
  }, [])
  const renderEmptyView = () => {
    return (
      <div className="renderEmptyView-container">
        <img
          alt="no books"
          src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727935808/empty_search_view_cqmlp3.jpg"
          className="renderEmptyView-image"
        />
        <p className="renderEmptyView-para">
          Your search for {searchText} did not find any matches.
        </p>
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
  const failureViewBooks = () => {
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
          onClick={() => handleSearchForBooksContainer()}
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
  const successView = () => {
    const renderBook = () => {
      return (
        <ul className="bookshelves-content-books-container">
          {searchList.length > 0
            ? searchList.map(eachBook => (
                <BookItem key={eachBook.id} eachBook={eachBook} />
              ))
            : renderEmptyView()}
        </ul>
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
      <>
        <div className="bookshelves-buttons-content-container-desktop bookshelves-buttons-content-container-desktop">
          <div className="bookshelves-buttons-container">
            <h1 className="bookshelves-main-heading">Bookshelves</h1>
            <ul className="bookshelves-buttons-unordered-list">
              {bookshelvesList.map(eachBtn => (
                <Buttons
                  key={eachBtn.id}
                  eachBtn={eachBtn}
                  activeBtn={activeBtn}
                  handleActiveBtn={handleActiveBtn}
                />
              ))}
            </ul>
          </div>
          <div className="bookshelves-content-container">
            <div className="bookshelves-heading-input-container">
              <div className="bookshelves-books-char-heading">
                <h1 className="bookshelves-content-main-heading">
                  {activeHead.label} Books
                </h1>
              </div>
              <div className="bookshelves-input-container">
                <input
                  className="bookshelves-input"
                  type="search"
                  placeholder="Search"
                  onChange={handleInput}
                  value={searchText}
                />
                <button
                  testid="searchButton"
                  onClick={() => searchText !== '' && handleSearch(activeBtn)}
                  className="bookshelves-search-icon"
                  testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="bookshelves-buttons-container-mobile">
              <h1 className="bookshelves-main-heading">Bookshelves</h1>
              <ul className="bookshelves-buttons-unordered-list-mobile">
                {bookshelvesList.map(eachBtn => (
                  <Buttons
                    key={eachBtn.id}
                    eachBtn={eachBtn}
                    activeBtn={activeBtn}
                    handleActiveBtn={handleActiveBtn}
                  />
                ))}
              </ul>
            </div>
            {renderBooks()}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // console.log(searchList)
  const render = () => {
    switch (initialStatusBooks) {
      case renderInitializationBooks.success:
        return successView()
      case renderInitializationBooks.failure:
        return failureViewBooks()
      case renderInitializationBooks.loading:
        return loadingView()
      default:
        return ''
    }
  }

  return (
    <div className="bookshelves-container">
      <Navbar />
      {render()}
    </div>
  )
}
export default Bookshelves
