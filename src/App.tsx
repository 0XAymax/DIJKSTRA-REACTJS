import './App.css'
import Home from './marketing/page'
import { Routes, Route } from "react-router-dom";
import NotFound from './pages/notFound';
import Login from './auth/login/login';
import SignUp from './auth/signup/signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
