import { useState, useEffect } from 'react'
import Login from './components/Login'
import CarList from './components/CarList'
import './App.css'

function App() {
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        // Загружаем пользователя
        try {
            const savedUser = localStorage.getItem('user')
            if (savedUser && savedUser !== 'undefined') {
                setUser(JSON.parse(savedUser))
            }
        } catch (e) {
            console.error('Ошибка загрузки пользователя:', e)
            localStorage.removeItem('user')
        }
        
        // Загружаем избранное
        try {
            const savedFavorites = localStorage.getItem('favorites')
            if (savedFavorites && savedFavorites !== 'undefined') {
                setFavorites(JSON.parse(savedFavorites))
            }
        } catch (e) {
            console.error('Ошибка загрузки избранного:', e)
            localStorage.removeItem('favorites')
        }
    }, [])

    const handleLogin = (userData) => {
        setUser(userData)
    }

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8000/api/auth/logout')
        } catch (e) {
            console.error('Ошибка logout:', e)
        }
        localStorage.removeItem('user')
        localStorage.removeItem('favorites')
        setUser(null)
        setFavorites([])
    }

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

    if (!user) {
        return <Login onLogin={handleLogin} />
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="header-content">
                    <h1>🚗 Trend Auto - Автосалон</h1>
                    <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-role">
                            {user.role === 'admin' ? '👨‍ Администратор' : '👤 Клиент'}
                        </span>
                        <button onClick={handleLogout} className="logout-btn">
                            Выйти
                        </button>
                    </div>
                </div>
            </header>
            <main>
                <CarList 
                    user={user}
                    favorites={favorites}
                    addToFavorites={addToFavorites} 
                    removeFromFavorites={removeFromFavorites}
                />
            </main>
        </div>
    )
}

export default App