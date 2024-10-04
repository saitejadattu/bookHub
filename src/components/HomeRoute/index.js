import './index.css'
import React, {useEffect, useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import EachCarousel from '../EachCarousel'
import Navbar from '../Navbar'
import Footer from '../Footer'
const renderInitialization = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const Home = () => {
  const [topBooksList, setTopBookList] = useState([])
  const [initializationStatus, setInitializationStatus] = useState(
    renderInitialization.initial,
  )

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const setting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  }
  const renderTopRatedBooks = async () => {
    setInitializationStatus(renderInitialization.loading)
    // console.log("lololo")
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateResponse = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      setTopBookList(updateResponse)
      setInitializationStatus(renderInitialization.success)
    } else {
      setInitializationStatus(renderInitialization.failure)
    }
  }
  useEffect(() => {
    renderTopRatedBooks()
  }, [])
  const loadingView = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  const failureView = () => {
    return (
      <div className="failureView-container-home-home">
        <img
          alt="failure view"
          className="failureView-image"
          src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727948960/somthingwent_wrong_jvkvyi.jpg"
        />
        <p className="failureView-para">
          Something went wrong, Please try again.
        </p>
        <button
          className="failureView-button"
          onClick={() => renderTopRatedBooks()}
        >
          Try Again
        </button>
      </div>
    )
  }
  const sliderView = () => {
    return (
      <Slider
        {...settings}
        className="home-carousel-slider-container-desktop home-carousel-slider-container-mobile"
      >
        {topBooksList !== [] &&
          topBooksList.map(eachBook => (
            <EachCarousel key={eachBook.id} eachBook={eachBook} />
          ))}
      </Slider>
    )
  }
  const successView = () => {
    return (
      <>
        <div className="home-content-container">
          <div className="home-heading-para-container">
            <h1 className="home-main-heading-desktop home-main-heading-mobile">
              Find Your Next Favorite Books?
            </h1>
            <p className="home-main-para-desktop home-main-para-mobile">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              className="home-carousel-find-button-mobile"
              onClick={renderTopRatedBooks}
            >
              Find Books
            </button>
          </div>

          <div className="home-carousel-container-desktop">
            <div className="home-carousel-heading-container-desktop ">
              <h1 className="home-carousel-heading">Top Rated Books</h1>
              <button
                className="home-carousel-find-button-desktop"
                onClick={renderTopRatedBooks}
              >
                Find Books
              </button>
            </div>
            <div className="home-carousel-heading-container-mobile">
              <h1 className="home-carousel-heading-mobile">Top Rated Books</h1>
            </div>
            <div className="home-carousel-cards-container-desktop home-carousel-cards-container-mobile">
              {sliderView()}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
  // console.log(topBooksList)
  const render = () => {
    switch (initializationStatus) {
      case renderInitialization.success:
        return successView()
      case renderInitialization.failure:
        return failureView()
      case renderInitialization.loading:
        return loadingView()
      default:
        return ''
    }
  }
  return (
    <div className="home-container">
      <Navbar />
      {render()}
    </div>
  )
}
export default Home
