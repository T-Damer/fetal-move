import { ErrorBoundary } from 'react-error-boundary'
import { Route, Router, Switch } from 'wouter-preact'
import { ToastContainer } from 'react-toastify'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import DetailsPage from 'screens/DetailsPage'
import ErrorFallback from 'components/ErrorFallback'
import Footer from 'components/Footer'
import Main from 'screens/Main'

export default function () {
  return (
    <div className="flex flex-col container min-h-[100dvh] mx-auto p-5 md:p-10 prose">
      <Router hook={useHashLocation}>
        <Switch>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Route
              path="/patient/:id"
              component={({ params }: { params: { id: string } }) => (
                <DetailsPage {...params} />
              )}
            />
            <Route component={Main} />
            <Footer />
          </ErrorBoundary>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  )
}
