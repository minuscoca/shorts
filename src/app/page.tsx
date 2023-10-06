import Feeds from './foryou/feeds'
import Header from './components/header'

export default function HomePage() {
  return (
    <main className="relative h-screen flex">
      <Header />
      <Feeds />
    </main>
  )
}
