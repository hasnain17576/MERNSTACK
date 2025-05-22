import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FeeManagement from './pages/FeeManagement'
import Students from './pages/Students'
import Classes from './pages/Classes'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="fee-management" element={<FeeManagement />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App 