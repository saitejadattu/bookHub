import './index.css'
import {Link} from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <img
        alt="not found"
        className="page-not-found-image"
        src="https://res.cloudinary.com/dpm5mwwdr/image/upload/v1727947071/page_not_found_nkvotq.jpg"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-para">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="page-not-found-button">Go Back to Home</button>
      </Link>
    </div>
  )
}
export default PageNotFound
