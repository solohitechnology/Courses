import { useState } from 'react'
// import LoginForm from './components/pages/login/LoginPage';
import Dashboard from './components/pages/dashboard/Dashoard';
import HeaderPrimary from './components/header/Header'
import Library from './components/pages/books/Library'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/pages/login/LoginPage';
import Home from './components/home/Home';
import Footer from './components/pages/footer/Footer';
import RegistrationForm from './components/pages/register/RegisterPage';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<HeaderPrimary />
<Router>
      <Routes> 

        <Route path='/' element={<Home /> } />
        <Route path="/books" element={<Library />} />
        <Route path='/courses' element={<Dashboard /> } />
        <Route path='/login' element={<LoginForm /> } /> 
        <Route path='/register' element={<RegistrationForm />} />
     
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
