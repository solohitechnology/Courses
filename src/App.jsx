import { useState } from 'react'
// import LoginForm from './components/pages/login/LoginPage';
import Dashboard from './components/pages/dashboard/Dashoard';
import HeaderPrimary from './components/header/Header'
import Library from './components/pages/books/Library'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/pages/login/LoginPage';
import Home from './components/home/Home';
import SingleBook from './components/pages/books/SingleBook';
import Footer from './components/pages/footer/Footer';
import RegistrationForm from './components/pages/register/RegisterPage';
import RegistrationPage from './components/pages/seminar/RegistrationPage';
import './App.css'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<HeaderPrimary />
<Router>
      <Routes> 

        <Route path='/' element={<Home /> } />
        <Route path='/book/single/:id' element={<SingleBook />} />
        <Route path='/seminar/:id' element={<RegistrationPage />} />
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
