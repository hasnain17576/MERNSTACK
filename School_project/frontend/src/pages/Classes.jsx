import { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState('');
  const [fee, setFee] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: Implement class creation
    console.log('Create class:', { className, fee });
    handleClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Classes</h2>
        <Button variant="primary" onClick={handleShow}>
          Add New Class
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Fee Amount</th>
            <th>Total Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Class 1</td>
            <td>₹5,000</td>
            <td>25</td>
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
          <Modal.Title>Add New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="className">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fee">
              <Form.Label>Fee Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter fee amount"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Class
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Classes; 