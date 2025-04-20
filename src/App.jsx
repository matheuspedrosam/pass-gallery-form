import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Loader from './components/Loader/Loader'
import { Toaster } from './components/ui/sonner'
import FormPage from './pages/FormPage/FormPage'

function App() {
    const [loading, setLoading] = useState(false);

    if (loading) return <div className='grid min-h-dvh justify-center items-center'><Loader size={22} /></div>
    
    return (
        <>
            <Routes>
                <Route path='/' element={<FormPage />} />
            </Routes>

            <Toaster />
        </>
    );
}

export default App
