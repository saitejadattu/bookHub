import {useState} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginRoute = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // console.log(error)
  const renderSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('./')
  }
  const renderFailure = errorMsg => {
    setError(errorMsg)
  }
  const fetchLogin = async () => {
    const userDetailes = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetailes),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      renderSuccess(data.jwt_token)
    } else {
      renderFailure(data.error_msg)
    }
  }
  const onChangeUserName = e => {
    setUsername(e.target.value)
  }
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const handleForm = e => {
    e.preventDefault()
    fetchLogin()
  }
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-container-desktop login-container-mobile">
      <div className="login-image-form-container-desktop login-image-form-container-mobile">
        <img
          alt="login website logo"
          className="login-book-image-desktop"
          src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727837169/fbh7pcxz4ylyuayqkblz.png"
        />
        <img
          alt="login website logo"
          className="login-book-image-mobile"
          src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727971253/mobile_login_book_image_qr6eid.jpg"
        />
        <div className="login-form-div-container">
          <form className="login-form-container" onSubmit={handleForm}>
            <div className="login-book-logo">
              <img
                alt="website login"
                src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727840617/Group_7731_ekqi1e.png"
              />
            </div>
            <br />
            <label htmlFor="userName" className="login-label">
              Username*
            </label>
            <br />
            <input
              type="text"
              onChange={onChangeUserName}
              className="login-input"
              placeholder="Enter UserName...."
              id="userName"
              required
            />
            <br />
            <label htmlFor="passWord" className="login-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              onChange={onChangePassword}
              className="login-input"
              placeholder="Enter PassWord...."
              id="passWord"
              required
            />
            <br />
            <button className="login-button" type="submit">
              Login
            </button>
            {error.length > 0 && (
              <p className="login-error-message">*{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default withRouter(LoginRoute)
