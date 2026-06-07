import { useState, useEffect } from 'react'
import CarCard from './CarCard'
import './CarList.css'

function CarList({ addToFavorites, removeFromFavorites, favorites }) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cars')
      if (!response.ok) throw new Error('Ошибка загрузки')
      const data = await response.json()
      setCars(data.data || data)
      setLoading(false)
    } catch (err) {
      setError('Ошибка загрузки данных')
      setLoading(false)
    }
  }

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(filter.toLowerCase()) ||
    car.model.toLowerCase().includes(filter.toLowerCase())
  )

  const isFavorite = (carId) => {
    return favorites.some(car => car.id === carId)
  }

  if (loading) return <div className="loading">Загрузка...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="car-list">
      <div className="filter">
        <input
          type="text"
          placeholder="Поиск по марке или модели..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="cars-grid">
        {filteredCars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={isFavorite(car.id)}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </div>
  )
}

export default CarList