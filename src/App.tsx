import { ErrorBoundary } from 'react-error-boundary'
import { Route, Router, Switch } from 'wouter-preact'
import { ToastContainer } from 'react-toastify'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Button from 'components/Button'
import DetailsPage from 'screens/DetailsPage'
import Main from 'screens/Main'
import goMain from 'helpers/goMain'

function ErrorFallback() {
  return (
    <div className="flex flex-col gap-y-2 items-center justify-center w-full h-screen">
      <span>Что-то сломалось :(</span>
      <Button
        onClick={() => {
          goMain()
          window.location.reload()
        }}
      >
        Вернуться на главную
      </Button>
    </div>
  )
}

export default function () {
  return (
    <div className="container mx-auto p-5 md:p-10 prose">
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
          </ErrorBoundary>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  )
}
