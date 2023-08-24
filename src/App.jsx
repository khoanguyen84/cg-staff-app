import './App.css'
import CreateStaff from './components/CreateStaff/CreateStaff'
import MainLayout from './components/Layout/MainLayout'
import StaffList from './components/StaffList/StaffList'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<StaffList />} />
        <Route path='/staff/list' element={<StaffList />} />
        <Route path='/staff/create' element={<CreateStaff />} />
      </Routes>
    </MainLayout>
  )
}

export default App
