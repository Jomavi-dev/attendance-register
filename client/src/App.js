import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'

import { Navbar, Home, Login, Register, Todo, Admin } from './components'
import { PrivateRoute, PublicRoute } from './hocs'

function NotFound() {
  let location = useLocation()
  return (
    <div className="text-center mt-5 pt-5">
      <h1>404 Error</h1>
      <h4 className="pt-3 mt-5">Page Not Found at {location.pathname}</h4>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path='/' exact component={Home} />
          <PublicRoute path='/login' component={Login} />
          <PublicRoute path='/register' component={Register} />
          <PrivateRoute path='/todos' component={Todo} roles={['user', 'admin']} />
          <PrivateRoute path='/admin' component={Admin} roles={['admin']} />
          <Route path='*'><NotFound /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
