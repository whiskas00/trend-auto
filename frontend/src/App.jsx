import { useState, useEffect } from 'react'
import CarList from './components/CarList'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  const addToFavorites = (car) => {
    const newFavorites = [...favorites, car]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (carId) => {
    const newFavorites = favorites.filter(car => car.id !== carId)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 Trend Auto - Автосалон</h1>
      </header>
      <main>
        <CarList 
          addToFavorites={addToFavorites} 
          removeFromFavorites={removeFromFavorites}
          favorites={favorites}
        />
      </main>
    </div>
  )
}

export default App