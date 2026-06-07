import './CarCard.css'

function CarCard({ car, isFavorite, addToFavorites, removeFromFavorites }) {
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(car.id)
    } else {
      addToFavorites(car)
    }
  }

  return (
    <div className="car-card">
      <div className="car-image">
        <div className="placeholder-image">🚗</div>
      </div>
      <div className="car-info">
        <h3>{car.brand} {car.model}</h3>
        <p className="car-year">Год: {car.year}</p>
        <p className="car-price">{car.price.toLocaleString()} ₽</p>
        <p className="car-mileage">Пробег: {car.mileage} км</p>
        <p className="car-category">{car.category_name}</p>
        {car.description && <p className="car-description">{car.description}</p>}
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
        </button>
      </div>
    </div>
  )
}

export default CarCard