import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            
            const data = await response.json()
            
            if (data.status === 'success') {
                // Поддержка разных форматов ответа
                const user = data.data || data.user || data
                localStorage.setItem('user', JSON.stringify(user))
                onLogin(user)
            } else {
                setError(data.message || 'Ошибка входа')
            }
        } catch (err) {
            console.error('Ошибка:', err)
            setError('Ошибка подключения к серверу')
        }
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Вход в систему</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@techmarket.ru"
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className="login-btn">Войти</button>
                </form>
                <div className="test-accounts">
                    <p><strong>Тестовые аккаунты:</strong></p>
                    <p>Админ: admin@techmarket.ru / password</p>
                    <p>Клиент: client@techmarket.ru / password</p>
                </div>
            </div>
        </div>
    )
}

export default Login