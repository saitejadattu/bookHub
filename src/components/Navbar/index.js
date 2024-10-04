import './index.css'
import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
// const buttons = [
//   {id: 1, btnName: 'Home', path: '/'},
//   {id: 2, btnName: 'Bookshelves', path: '/shelf'},
// ]
const Navbar = props => {
  const [isActive, setIsActive] = useState(false)
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const handleHamburger = () => {
    setIsActive(prev => !prev)
  }
  return (
    <>
      <nav className="navbar-container-desktop navbar-container-mobile">
        <Link
          to="/"
          className="navbar-book-logo-desktop navbar-book-logo-mobile"
        >
          <img
            alt="login website logo"
            src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727840617/Group_7731_ekqi1e.png"
          />
        </Link>
        <ul className="navbar-un-ordered-list-desktop">
          <Link to="/">
            <button className="navbar-buttons">
              <li>Home</li>
            </button>
          </Link>
          <Link to="/shelf">
            <button className="navbar-buttons">
              <li>Bookshelves</li>
            </button>
          </Link>
          <button className="navbar-logout-button" onClick={handleLogout}>
            <li>Logout</li>
          </button>
        </ul>
        <div className="navbar-un-ordered-list-mobile">
          <button className="navabr-hamberger-button" onClick={handleHamburger}>
            <img
              className="navbar-hamberger-icon"
              src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1728006283/hamberger_pvr6hz.jpg"
            />
          </button>
        </div>
      </nav>
      {isActive && (
        <div className="navbar-un-ordered-list-mobile-popup">
          <Link to="/">
            <button className="navbar-buttons">
              <li>Home</li>
            </button>
          </Link>
          <Link to="/shelf">
            <button className="navbar-buttons">
              <li>Bookshelves</li>
            </button>
          </Link>
          <button className="navbar-logout-button" onClick={handleLogout}>
            <li>Logout</li>
          </button>
          <button className="navbar-logout-colse" onClick={handleHamburger}>
            <li>X</li>
          </button>
        </div>
      )}
    </>
  )
}

export default withRouter(Navbar)
