import { useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material'

const initialStudents = [
  {
    id: 1,
    name: 'John Doe',
    class: 'Class 1',
    rollNumber: '001',
    feeStatus: 'Paid',
    amount: 5000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    class: 'Class 2',
    rollNumber: '002',
    feeStatus: 'Pending',
    amount: 5500,
  },
  // Add more initial students as needed
]

const classes = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
]

function Students() {
  const [students, setStudents] = useState(initialStudents)
  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollNumber: '',
    feeStatus: 'Pending',
    amount: '',
  })

  const handleClickOpen = (student = null) => {
    if (student) {
      setSelectedStudent(student)
      setFormData({
        name: student.name,
        class: student.class,
        rollNumber: student.rollNumber,
        feeStatus: student.feeStatus,
        amount: student.amount,
      })
    } else {
      setSelectedStudent(null)
      setFormData({
        name: '',
        class: '',
        rollNumber: '',
        feeStatus: 'Pending',
        amount: '',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedStudent(null)
    setFormData({
      name: '',
      class: '',
      rollNumber: '',
      feeStatus: 'Pending',
      amount: '',
    })
  }

  const handleSubmit = () => {
    if (selectedStudent) {
      // Update existing student
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id
            ? {
                ...s,
                name: formData.name,
                class: formData.class,
                rollNumber: formData.rollNumber,
                feeStatus: formData.feeStatus,
                amount: Number(formData.amount),
              }
            : s
        )
      )
    } else {
      // Add new student
      const newStudent = {
        id: students.length + 1,
        name: formData.name,
        class: formData.class,
        rollNumber: formData.rollNumber,
        feeStatus: formData.feeStatus,
        amount: Number(formData.amount),
      }
      setStudents([...students, newStudent])
    }
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Students</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
        >
          Add New Student
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Fee Status</TableCell>
              <TableCell align="right">Amount (₹)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.feeStatus}</TableCell>
                <TableCell align="right">{student.amount}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClickOpen(student)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Student Name"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <TextField
            select
            margin="dense"
            label="Class"
            fullWidth
            value={formData.class}
            onChange={(e) =>
              setFormData({ ...formData, class: e.target.value })
            }
          >
            {classes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Roll Number"
            fullWidth
            value={formData.rollNumber}
            onChange={(e) =>
              setFormData({ ...formData, rollNumber: e.target.value })
            }
          />
          <TextField
            select
            margin="dense"
            label="Fee Status"
            fullWidth
            value={formData.feeStatus}
            onChange={(e) =>
              setFormData({ ...formData, feeStatus: e.target.value })
            }
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Fee Amount"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Students 