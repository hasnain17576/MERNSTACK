import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Students = () => {
  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    amount: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: Implement student creation
    console.log('Create student:', studentData);
    handleClose();
  };

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Students</h2>
        <Button variant="primary" onClick={handleShow}>
          Add New Student
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Class</th>
            <th>Fee Status</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>2024001</td>
            <td>Class 1</td>
            <td>Paid</td>
            <td>₹5,000</td>
            <td>
              <Button variant="info" size="sm" className="me-2">
                Edit
              </Button>
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter student name"
                value={studentData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="rollNumber"
                placeholder="Enter roll number"
                value={studentData.rollNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="class">
              <Form.Label>Class</Form.Label>
              <Form.Select
                name="class"
                value={studentData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Fee Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter fee amount"
                value={studentData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Student
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Students; 