import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route
import Counter from './components/Counter'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import Bookshelves from './components/Bookshelves'
import ProtectedRoute from './components/ProtectedRoute'
import BookDetailedView from './components/BookDetailedView'
import PageNotFound from './components/PageNotFound'
const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/shelf" component={Bookshelves} />
      <ProtectedRoute exact path="/books/:id" component={BookDetailedView} />
      <Route exact path="/not-found" component={PageNotFound} />
      <Redirect to="not-found" />
    </Switch>
  )
}

export default App
