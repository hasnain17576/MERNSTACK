import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    class: '',
    rollNumber: ''
  })
  const [selectedClass, setSelectedClass] = useState('all')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students')
      setStudents(response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
      setError('Failed to fetch students. Please try again.')
    }
  }

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    })
    // Clear any previous error/success messages when user starts typing
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Validate input
      if (!newStudent.name || !newStudent.fatherName || !newStudent.class || !newStudent.rollNumber) {
        setError('All fields are required')
        return
      }

      const classNum = parseInt(newStudent.class)
      if (isNaN(classNum) || classNum < 1 || classNum > 10) {
        setError('Class must be a number between 1 and 10')
        return
      }

      const response = await axios.post('/api/students', {
        ...newStudent,
        class: classNum
      })

      console.log('Student added:', response.data)
      setSuccess('Student added successfully!')
      setNewStudent({ name: '', fatherName: '', class: '', rollNumber: '' })
      fetchStudents()
    } catch (error) {
      console.error('Error adding student:', error)
      setError(error.response?.data?.message || 'Error adding student. Please try again.')
    }
  }

  const toggleFeeStatus = async (studentId, month) => {
    try {
      const student = students.find(s => s._id === studentId)
      const currentStatus = student.feeStatus.get(month) || false
      await axios.patch(`/api/students/${studentId}/fee`, {
        month,
        paid: !currentStatus
      })
      fetchStudents()
    } catch (error) {
      console.error('Error updating fee status:', error)
      setError('Error updating fee status. Please try again.')
    }
  }

  // Group students by class
  const studentsByClass = students.reduce((acc, student) => {
    const classNum = student.class
    if (!acc[classNum]) {
      acc[classNum] = []
    }
    acc[classNum].push(student)
    return acc
  }, {})

  // Get all class numbers
  const classNumbers = Object.keys(studentsByClass).sort((a, b) => a - b)

  return (
    <div className="App">
      <h1>School Fee Management System</h1>
      
      <div className="add-student-form">
        <h2>Add New Student</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="class"
            placeholder="Class (1-10)"
            value={newStudent.class}
            onChange={handleInputChange}
            min="1"
            max="10"
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            value={newStudent.rollNumber}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      </div>

      <div className="class-filter">
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="class-select"
        >
          <option value="all">All Classes</option>
          {classNumbers.map(classNum => (
            <option key={classNum} value={classNum}>Class {classNum}</option>
          ))}
        </select>
      </div>

      <div className="students-list">
        {selectedClass === 'all' ? (
          classNumbers.map(classNum => (
            <div key={classNum} className="class-section">
              <h2>Class {classNum}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Roll Number</th>
                    <th>Fee Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsByClass[classNum].map(student => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.rollNumber}</td>
                      <td>
                        {['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                          <button
                            key={month}
                            className={`fee-status ${student.feeStatus.get(month) ? 'paid' : 'unpaid'}`}
                            onClick={() => toggleFeeStatus(student._id, month)}
                          >
                            {month}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div className="class-section">
            <h2>Class {selectedClass}</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Roll Number</th>
                  <th>Fee Status</th>
                </tr>
              </thead>
              <tbody>
                {studentsByClass[selectedClass]?.map(student => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.rollNumber}</td>
                    <td>
                      {['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                        <button
                          key={month}
                          className={`fee-status ${student.feeStatus.get(month) ? 'paid' : 'unpaid'}`}
                          onClick={() => toggleFeeStatus(student._id, month)}
                        >
                          {month}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App 