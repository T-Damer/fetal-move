import { Route, Router, Switch } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import DetailsPage from 'screens/DetailsPage'
import Main from 'screens/Main'

export default function () {
  return (
    <div className="container mx-auto p-5 md:p-10 prose">
      <Router hook={useHashLocation}>
        <Switch>
          <Route
            path="/patient/:id"
            component={({ params }: { params: { id: string } }) => (
              <DetailsPage {...params} />
            )}
          />
          <Route component={Main} />
        </Switch>
      </Router>
    </div>
  )
}
