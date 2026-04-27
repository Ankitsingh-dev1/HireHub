import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import SavedJobs from './Pages/SavedJobs'
import Dashobard from './Pages/Dashobard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='saved-jobs' element={<SavedJobs />} />
        <Route path='dashboard' element={<Dashobard />} />
      </Route>
    </Routes>
  )
}

export default App