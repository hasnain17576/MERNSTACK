import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    class: '',
    rollNumber: ''
  })
  const [selectedClass, setSelectedClass] = useState('all')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true)
        await fetchStudents()
        setInitialized(true)
      } catch (error) {
        console.error('Error initializing app:', error)
        setError('Failed to initialize app. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    initializeApp()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students')
      console.log('Fetched students:', response.data)
      setStudents(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching students:', error)
      setError('Failed to fetch students. Please check if the server is running.')
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.name || !formData.fatherName || !formData.class || !formData.rollNumber) {
        throw new Error('All fields are required')
      }

      const classNum = parseInt(formData.class)
      if (isNaN(classNum) || classNum < 1 || classNum > 10) {
        throw new Error('Class must be a number between 1 and 10')
      }

      const response = await axios.post('/api/students', {
        ...formData,
        class: classNum
      })
      
      console.log('Student added:', response.data)
      setSuccess('Student added successfully!')
      setFormData({
        name: '',
        fatherName: '',
        class: '',
        rollNumber: ''
      })
      await fetchStudents()
    } catch (error) {
      console.error('Error adding student:', error)
      setError(error.response?.data?.message || error.message || 'Error adding student')
    } finally {
      setLoading(false)
    }
  }

  const handleFeeSubmit = async (studentId, month) => {
    if (loading) return

    setError('')
    setLoading(true)
    try {
      const student = students.find(s => s._id === studentId)
      if (!student) {
        throw new Error('Student not found')
      }

      const currentStatus = student.feeStatus?.get(month) || false
      console.log(`Updating fee status for ${month}:`, !currentStatus)
      
      const response = await axios.patch(`/api/students/${studentId}/fee`, {
        month,
        paid: !currentStatus
      })
      
      console.log('Fee status updated:', response.data)
      await fetchStudents()
    } catch (error) {
      console.error('Error updating fee status:', error)
      setError('Error updating fee status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const getStudentsByClass = (classNumber) => {
    return students.filter(student => student.class === classNumber)
  }

  const renderFeeStatus = (student) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    return (
      <div className="fee-status">
        {months.map(month => (
          <button
            key={month}
            className={`fee-button ${student.feeStatus?.get(month) ? 'paid' : 'unpaid'}`}
            onClick={() => handleFeeSubmit(student._id, month)}
            disabled={loading}
          >
            {month}
          </button>
        ))}
      </div>
    )
  }

  const renderClassSection = (classNumber) => {
    const classStudents = getStudentsByClass(classNumber)
    if (classStudents.length === 0) return null

    return (
      <div className="class-section" key={classNumber}>
        <h2>Class {classNumber}</h2>
        <div className="students-list">
          {classStudents.map((student) => (
            <div key={student._id} className="student-card">
              <h3>{student.name}</h3>
              <p>Father's Name: {student.fatherName}</p>
              <p>Roll Number: {student.rollNumber}</p>
              {renderFeeStatus(student)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!initialized) {
    return (
      <div className="container">
        <h1>School Fee Management System</h1>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading application...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>School Fee Management System</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          type="number"
          name="class"
          placeholder="Class (1-10)"
          value={formData.class}
          onChange={handleChange}
          min="1"
          max="10"
          required
          disabled={loading}
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </form>

      <div className="class-filter">
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="class-select"
          disabled={loading}
        >
          <option value="all">All Classes</option>
          {[1,2,3,4,5,6,7,8,9,10].map(num => (
            <option key={num} value={num}>Class {num}</option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading...</div>}

      <div className="classes-container">
        {selectedClass === 'all' 
          ? [1,2,3,4,5,6,7,8,9,10].map(renderClassSection)
          : renderClassSection(parseInt(selectedClass))
        }
      </div>
    </div>
  )
}

export default App 