import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State Management
  const [students, setStudents] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    class: '',
    section: '',
    rollNumber: '',
    feeAmount: '',
    feeStatus: 'Pending',
    admissionDate: '',
    contactNumber: '',
    feeMonth: '1' // Default to January
  })

  // Fee Months
  const feeMonths = [
    { id: '1', name: 'January' },
    { id: '2', name: 'February' },
    { id: '3', name: 'March' },
    { id: '4', name: 'April' },
    { id: '5', name: 'May' },
    { id: '6', name: 'June' },
    { id: '7', name: 'July' },
    { id: '8', name: 'August' },
    { id: '9', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ]

  // Edit Student State
  const [editingStudent, setEditingStudent] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Sample Data
  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: '1', name: 'Class 1' },
    { id: '2', name: 'Class 2' },
    { id: '3', name: 'Class 3' },
    { id: '4', name: 'Class 4' },
    { id: '5', name: 'Class 5' },
    { id: '6', name: 'Class 6' },
    { id: '7', name: 'Class 7' },
    { id: '8', name: 'Class 8' },
    { id: '9', name: 'Class 9' },
    { id: '10', name: 'Class 10' }
  ]

  const sections = ['A', 'B', 'C']

  // Sample Students Data
  const [sampleStudents, setSampleStudents] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      fatherName: "Mohammad Khan",
      class: "9",
      section: "A",
      rollNumber: "001",
      feeAmount: 5000,
      feeStatus: "Paid",
      admissionDate: "2024-01-15",
      contactNumber: "03001234567"
    },
    {
      id: 2,
      name: "Sara Ahmed",
      fatherName: "Ali Ahmed",
      class: "10",
      section: "B",
      rollNumber: "002",
      feeAmount: 5500,
      feeStatus: "Pending",
      admissionDate: "2024-01-10",
      contactNumber: "03001234568"
    },
    {
      id: 3,
      name: "Usman Ali",
      fatherName: "Hassan Ali",
      class: "8",
      section: "C",
      rollNumber: "003",
      feeAmount: 4800,
      feeStatus: "Paid",
      admissionDate: "2024-01-20",
      contactNumber: "03001234569"
    }
  ])

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter Students
  const filteredStudents = selectedClass === 'all' 
    ? sampleStudents 
    : sampleStudents.filter(student => student.class === selectedClass)

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Add new state for add student flow
  const [showClassMonthModal, setShowClassMonthModal] = useState(false)
  const [selectedAddClass, setSelectedAddClass] = useState('')
  const [selectedAddMonth, setSelectedAddMonth] = useState('1')

  // Modify the Add Student Modal to show class and month selection first
  const AddStudentModal = () => {
    if (!showAddModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          {!selectedAddClass ? (
            // Step 1: Select Class
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4">Select Class</h2>
              <div className="grid grid-cols-2 gap-4">
                {classes.filter(c => c.id !== 'all').map(classItem => (
                  <button
                    key={classItem.id}
                    onClick={() => setSelectedAddClass(classItem.id)}
                    className="p-4 rounded-lg text-center bg-white border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold">{classItem.name}</h3>
                  </button>
                ))}
              </div>
            </div>
          ) : !selectedAddMonth ? (
            // Step 2: Select Month
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4">Select Month for Class {selectedAddClass}</h2>
              <div className="grid grid-cols-3 gap-4">
                {feeMonths.map(month => (
                  <button
                    key={month.id}
                    onClick={() => setSelectedAddMonth(month.id)}
                    className="p-4 rounded-lg text-center bg-white border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold">{month.name}</h3>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedAddClass('')}
                className="mt-4 text-gray-500 hover:text-primary"
              >
                ← Back to Class Selection
              </button>
            </div>
          ) : (
            // Step 3: Add Student Details
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add New Student</h2>
                <div className="text-sm text-gray-500">
                  Class {selectedAddClass} - {feeMonths.find(m => m.id === selectedAddMonth)?.name}
                </div>
              </div>
              <form onSubmit={handleAddStudent}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newStudent.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={newStudent.fatherName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Section</label>
                      <select
                        name="section"
                        value={newStudent.section}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">Select Section</option>
                        {sections.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={newStudent.rollNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fee Amount (Rs.)</label>
                    <input
                      type="number"
                      name="feeAmount"
                      value={newStudent.feeAmount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admission Date</label>
                    <input
                      type="date"
                      name="admissionDate"
                      value={newStudent.admissionDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={newStudent.contactNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedAddMonth('')}
                    className="text-gray-500 hover:text-primary"
                  >
                    ← Back to Month Selection
                  </button>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false)
                        setSelectedAddClass('')
                        setSelectedAddMonth('')
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      Add Student
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Modify handleAddStudent to include class and month
  const handleAddStudent = (e) => {
    e.preventDefault()
    const newId = sampleStudents.length + 1
    const studentToAdd = {
      ...newStudent,
      id: newId,
      class: selectedAddClass,
      feeMonth: selectedAddMonth,
      feeAmount: Number(newStudent.feeAmount)
    }
    setSampleStudents(prev => [...prev, studentToAdd])
    setShowAddModal(false)
    setSelectedAddClass('')
    setSelectedAddMonth('')
    setNewStudent({
      name: '',
      fatherName: '',
      class: '',
      section: '',
      rollNumber: '',
      feeAmount: '',
      feeStatus: 'Pending',
      admissionDate: '',
      contactNumber: '',
      feeMonth: '1'
    })
    showNotification('Student added successfully!')
  }

  // Modify the Add New Student button click handler
  const handleAddNewStudentClick = () => {
    setSelectedAddClass('')
    setSelectedAddMonth('')
    setShowAddModal(true)
  }

  // Delete Student
  const handleDeleteStudent = (id) => {
    setSampleStudents(prev => prev.filter(student => student.id !== id))
    showNotification('Student deleted successfully!')
  }

  // Show Notification
  const showNotification = (message) => {
    const notification = document.createElement('div')
    notification.className = 'notification'
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  // Handle Edit Student
  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setShowEditModal(true)
  }

  // Handle Update Student
  const handleUpdateStudent = (e) => {
    e.preventDefault()
    setSampleStudents(prev => prev.map(student => 
      student.id === editingStudent.id 
        ? { ...student, feeStatus: 'Paid' }
        : student
    ))
    setShowEditModal(false)
    setEditingStudent(null)
    showNotification('Fee status updated successfully!')
  }

  // Edit Modal Component
  const EditStudentModal = () => {
    if (!showEditModal || !editingStudent) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Update Fee Status</h2>
          <div className="mb-4">
            <p className="text-gray-600">Student: {editingStudent.name}</p>
            <p className="text-gray-600">Class: {editingStudent.class}</p>
            <p className="text-gray-600">Fee Amount: Rs. {editingStudent.feeAmount}</p>
          </div>
          <form onSubmit={handleUpdateStudent}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fee Status</label>
                <select
                  name="feeStatus"
                  value={editingStudent.feeStatus}
                  onChange={(e) => setEditingStudent(prev => ({ ...prev, feeStatus: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false)
                  setEditingStudent(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Export to CSV
  const handleExportData = () => {
    const headers = ['Roll No', 'Student Name', 'Father\'s Name', 'Class', 'Section', 'Fee Amount', 'Fee Month', 'Fee Status']
    const csvData = filteredStudents.map(student => [
      student.rollNumber,
      student.name,
      student.fatherName,
      `Class ${student.class}`,
      student.section,
      `Rs. ${student.feeAmount}`,
      feeMonths.find(m => m.id === student.feeMonth)?.name || 'Not Set',
      student.feeStatus
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `class_${selectedClass}_fees_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Print Records
  const handlePrintRecords = () => {
    const printWindow = window.open('', '_blank')
    const title = selectedClass === 'all' ? 'All Classes' : `Class ${selectedClass}`
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title} - Fee Records</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .header { text-align: center; margin-bottom: 20px; }
            .paid { color: green; }
            .pending { color: red; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>HASSAN PUBLIC HIGH SCHOOL</h1>
            <h2>${title} - Fee Records</h2>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Father's Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Fee Amount</th>
                <th>Fee Month</th>
                <th>Fee Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStudents.map(student => `
                <tr>
                  <td>${student.rollNumber}</td>
                  <td>${student.name}</td>
                  <td>${student.fatherName}</td>
                  <td>Class ${student.class}</td>
                  <td>${student.section}</td>
                  <td>Rs. ${student.feeAmount}</td>
                  <td>${feeMonths.find(m => m.id === student.feeMonth)?.name || 'Not Set'}</td>
                  <td class="${student.feeStatus.toLowerCase()}">${student.feeStatus}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  // Add new state for selected month
  const [selectedMonth, setSelectedMonth] = useState('1')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-lg font-bold tracking-wide">HASSAN PUBLIC HIGH SCHOOL</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">Academic Year 2024</span>
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">Est. 1990</span>
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">info@school.com</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 relative">
            {/* Left: Add New Student */}
            <div className="flex items-center">
              <button 
                className="btn btn-primary flex items-center space-x-2"
                onClick={handleAddNewStudentClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Student</span>
              </button>
            </div>
            {/* Right: All Classes */}
            <div className="flex items-center">
              <button
                onClick={() => setSelectedClass('all')}
                className={`nav-link ${selectedClass === 'all' ? 'text-primary font-semibold' : ''}`}
              >
                All Classes
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/hero-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to HASSAN PUBLIC HIGH SCHOOL</h1>
          <p className="text-xl md:text-2xl mb-8 font-medium drop-shadow">Empowering Students for a Brighter Future</p>
          <div className="flex justify-center space-x-4">
            <button className="btn btn-secondary shadow-lg">View Student Records</button>
            <button className="btn btn-outline-light shadow-lg">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow animate-fadeInUp">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
              <p className="text-text-light">Quality education for all students</p>
            </div>
            <div className="bg-surface p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow animate-fadeInUp delay-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
              <p className="text-text-light">Secure and nurturing learning environment</p>
            </div>
            <div className="bg-surface p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow animate-fadeInUp delay-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Easy Fee Management</h3>
              <p className="text-text-light">Simple and transparent fee system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Records Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Fee Records</h2>
            {/* Class Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Class</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {classes.filter(c => c.id !== 'all').map(classItem => (
                  <button
                    key={classItem.id}
                    onClick={() => setSelectedClass(classItem.id)}
                    className={`p-3 rounded-lg text-center transition-all duration-200 font-medium border ${
                      selectedClass === classItem.id ? 'bg-primary text-white border-primary shadow' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {classItem.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Month Selection */}
            {selectedClass !== 'all' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Select Month</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {feeMonths.map(month => (
                    <button
                      key={month.id}
                      onClick={() => setSelectedMonth(month.id)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 font-medium border ${
                        selectedMonth === month.id ? 'bg-primary text-white border-primary shadow' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-primary hover:text-white'
                      }`}
                    >
                      {month.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Fee Table */}
            {selectedClass !== 'all' && selectedMonth && (
              <div className="overflow-x-auto animate-fadeIn">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Father's Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Section</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fee Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fee Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents
                      .filter(student => student.feeMonth === selectedMonth)
                      .map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{student.rollNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{student.fatherName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{student.section}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Rs. {student.feeAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.feeStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {student.feeStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              className="text-primary hover:text-primary-dark mr-3"
                              onClick={() => handleEditStudent(student)}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-accent text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-text-light">Email: info@school.com</p>
              <p className="text-text-light">Phone: (123) 456-7890</p>
              <p className="text-text-light">Address: 123 School Street, City</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">About School</a></li>
                <li><a href="#" className="footer-link">Admissions</a></li>
                <li><a href="#" className="footer-link">Academic Calendar</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-text-light mb-4">Subscribe for school updates</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/30 mt-8 pt-8 text-center text-text-light">
            <p>&copy; 2024 HASSAN PUBLIC HIGH SCHOOL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App 