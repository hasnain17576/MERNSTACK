import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Fees = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    student: '',
    amount: '',
    paymentMethod: 'cash',
    receiptNumber: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: Implement payment creation
    console.log('Create payment:', paymentData);
    handleClose();
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Fee Payments</h2>
        <Button variant="primary" onClick={handleShow}>
          Record New Payment
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Receipt No.</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REC001</td>
            <td>John Doe</td>
            <td>Class 1</td>
            <td>₹5,000</td>
            <td>Cash</td>
            <td>2024-03-15</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Record New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="student">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="student"
                value={paymentData.student}
                onChange={handleChange}
                required
              >
                <option value="">Select Student</option>
                <option value="1">John Doe - Class 1</option>
                <option value="2">Jane Smith - Class 2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={paymentData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="receiptNumber">
              <Form.Label>Receipt Number</Form.Label>
              <Form.Control
                type="text"
                name="receiptNumber"
                placeholder="Enter receipt number"
                value={paymentData.receiptNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Record Payment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Fees; 