import Feeds from './feeds'
import Header from '../components/header'

export default function FollowingPage() {
  return (
    <main className="relative h-screen flex">
      <Header />
      <Feeds />
    </main>
  )
}
