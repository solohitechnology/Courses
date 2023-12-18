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
import EmailForm from './components/pages/checkout/CheckoutPage';
import Privacy from './components/pages/policy/Privacy';
import BookList from './components/pages/books/BookList';
import Accessibility from './components/pages/Accessibility/Accessibility';
import RefundPolicy from './components/pages/RefundPolicy/RefundPolicy';
import RegistrationForm from './components/pages/register/RegisterPage';
import OtherService from './components/pages/ortherService/OtherService';
import AffiliateSignup from './components/pages/Affilate/AffiliateSignup';
import RegistrationPage from './components/pages/seminar/RegistrationPage';
import AffiliateProgram from './components/pages/Affilate/AffiliateProgram';
import StudentSupport from './components/pages/studentSupport/StudentSupport';
import ApplyInstructor from './components/pages/becomeAnInstructor/ApplyInstructor';
import BecomeInstructor from './components/pages/becomeAnInstructor/BecomeInstructor';
import InstructorSupport from './components/pages/instructorSupport/InstructorSupport';
import './App.css'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<HeaderPrimary />
<Router>
      <Routes> 

        <Route path='/' element={<Home /> } />
        <Route path="/books" element={<Library />} />
        <Route path='/login' element={<LoginForm /> } /> 
        <Route path='/courses' element={<Dashboard /> } />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/booklist' element={<BookList /> } />
        <Route path='/service' element={<OtherService />} />
        <Route path='/RefundPolicy' element={<RefundPolicy />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/user/checkout' element={<EmailForm />} />
        <Route path='/books/single/:id' element={<SingleBook />} />
        <Route path='/Accessibility' element={<Accessibility /> } />
        <Route path='/seminar/:id' element={<RegistrationPage />} />
        <Route path='/affiliatesignup' element={<AffiliateSignup />} />
        <Route path='/studentssupport' element={<StudentSupport /> } />
        <Route path='/applyinstructor' element={<ApplyInstructor /> } />
        <Route path='/AffiliateProgram' element={<AffiliateProgram />} />
        <Route path='/BecomeInstructor' element={<BecomeInstructor /> } />
        <Route path='/instructorSupport' element={<InstructorSupport /> } />
     
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
