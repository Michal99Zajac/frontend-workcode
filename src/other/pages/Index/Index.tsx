import {} from 'react'
import { Link } from 'react-router-dom'

export function Index(): JSX.Element {
  return (
    <div>
      <Link to="/aa">404</Link>
      <div>Index Page</div>
    </div>
  )
}

export default Index
