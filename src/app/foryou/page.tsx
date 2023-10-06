import Feeds from './feeds'
import Header from '../components/header'

export default function ForYouPage() {
  return (
    <main className="relative h-screen flex">
      <Header />
      <Feeds />
    </main>
  )
}
