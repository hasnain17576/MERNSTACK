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
  Grid,
} from '@mui/material'

const initialPayments = [
  {
    id: 1,
    studentName: 'John Doe',
    class: 'Class 1',
    rollNumber: '001',
    amount: 5000,
    paymentDate: '2024-02-20',
    paymentMethod: 'Cash',
    status: 'Paid',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    class: 'Class 2',
    rollNumber: '002',
    amount: 5500,
    paymentDate: '2024-02-21',
    paymentMethod: 'Online',
    status: 'Pending',
  },
]

const paymentMethods = ['Cash', 'Online', 'Cheque']
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

function FeeManagement() {
  const [payments, setPayments] = useState(initialPayments)
  const [open, setOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [formData, setFormData] = useState({
    studentName: '',
    class: '',
    rollNumber: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    status: 'Pending',
  })

  const handleClickOpen = (payment = null) => {
    if (payment) {
      setSelectedPayment(payment)
      setFormData({
        studentName: payment.studentName,
        class: payment.class,
        rollNumber: payment.rollNumber,
        amount: payment.amount,
        paymentDate: payment.paymentDate,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
      })
    } else {
      setSelectedPayment(null)
      setFormData({
        studentName: '',
        class: '',
        rollNumber: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Cash',
        status: 'Pending',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedPayment(null)
    setFormData({
      studentName: '',
      class: '',
      rollNumber: '',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Cash',
      status: 'Pending',
    })
  }

  const handleSubmit = () => {
    if (selectedPayment) {
      // Update existing payment
      setPayments(
        payments.map((p) =>
          p.id === selectedPayment.id
            ? {
                ...p,
                studentName: formData.studentName,
                class: formData.class,
                rollNumber: formData.rollNumber,
                amount: Number(formData.amount),
                paymentDate: formData.paymentDate,
                paymentMethod: formData.paymentMethod,
                status: formData.status,
              }
            : p
        )
      )
    } else {
      // Add new payment
      const newPayment = {
        id: payments.length + 1,
        studentName: formData.studentName,
        class: formData.class,
        rollNumber: formData.rollNumber,
        amount: Number(formData.amount),
        paymentDate: formData.paymentDate,
        paymentMethod: formData.paymentMethod,
        status: formData.status,
      }
      setPayments([...payments, newPayment])
    }
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Fee Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
        >
          Add New Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell align="right">Amount (₹)</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.studentName}</TableCell>
                <TableCell>{payment.class}</TableCell>
                <TableCell>{payment.rollNumber}</TableCell>
                <TableCell align="right">{payment.amount}</TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleClickOpen(payment)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPayment ? 'Edit Payment' : 'Add New Payment'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Student Name"
                fullWidth
                value={formData.studentName}
                onChange={(e) =>
                  setFormData({ ...formData, studentName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Roll Number"
                fullWidth
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Payment Date"
                type="date"
                fullWidth
                value={formData.paymentDate}
                onChange={(e) =>
                  setFormData({ ...formData, paymentDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Payment Method"
                fullWidth
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                fullWidth
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedPayment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FeeManagement 