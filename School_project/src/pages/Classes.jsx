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
} from '@mui/material'

const initialClasses = [
  { id: 1, name: 'Class 1', students: 45, fee: 5000 },
  { id: 2, name: 'Class 2', students: 48, fee: 5500 },
  { id: 3, name: 'Class 3', students: 50, fee: 6000 },
  { id: 4, name: 'Class 4', students: 52, fee: 6500 },
  { id: 5, name: 'Class 5', students: 55, fee: 7000 },
  { id: 6, name: 'Class 6', students: 58, fee: 7500 },
  { id: 7, name: 'Class 7', students: 60, fee: 8000 },
  { id: 8, name: 'Class 8', students: 62, fee: 8500 },
  { id: 9, name: 'Class 9', students: 65, fee: 9000 },
  { id: 10, name: 'Class 10', students: 68, fee: 9500 },
]

function Classes() {
  const [classes, setClasses] = useState(initialClasses)
  const [open, setOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    fee: '',
  })

  const handleClickOpen = (classData = null) => {
    if (classData) {
      setSelectedClass(classData)
      setFormData({
        name: classData.name,
        fee: classData.fee,
      })
    } else {
      setSelectedClass(null)
      setFormData({
        name: '',
        fee: '',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedClass(null)
    setFormData({
      name: '',
      fee: '',
    })
  }

  const handleSubmit = () => {
    if (selectedClass) {
      // Update existing class
      setClasses(
        classes.map((c) =>
          c.id === selectedClass.id
            ? { ...c, name: formData.name, fee: Number(formData.fee) }
            : c
        )
      )
    } else {
      // Add new class
      const newClass = {
        id: classes.length + 1,
        name: formData.name,
        students: 0,
        fee: Number(formData.fee),
      }
      setClasses([...classes, newClass])
    }
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Classes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
        >
          Add New Class
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell align="right">Number of Students</TableCell>
              <TableCell align="right">Fee Amount (₹)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classData) => (
              <TableRow key={classData.id}>
                <TableCell component="th" scope="row">
                  {classData.name}
                </TableCell>
                <TableCell align="right">{classData.students}</TableCell>
                <TableCell align="right">{classData.fee}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClickOpen(classData)}
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
          {selectedClass ? 'Edit Class' : 'Add New Class'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Class Name"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Fee Amount"
            type="number"
            fullWidth
            value={formData.fee}
            onChange={(e) =>
              setFormData({ ...formData, fee: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedClass ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Classes 