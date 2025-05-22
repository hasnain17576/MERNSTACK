import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col>
          <h1>Welcome to School Fee Management System</h1>
          <p className="lead">
            Manage your school fees efficiently and effectively
          </p>
        </Col>
      </Row>

      <Row className="py-3">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Classes</Card.Title>
              <Card.Text>
                Manage class information and fee structures
              </Card.Text>
              <Link to="/classes" className="btn btn-primary">
                View Classes
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Students</Card.Title>
              <Card.Text>
                Manage student records and fee payments
              </Card.Text>
              <Link to="/students" className="btn btn-primary">
                View Students
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Fees</Card.Title>
              <Card.Text>
                Track and manage fee collections
              </Card.Text>
              <Link to="/fees" className="btn btn-primary">
                View Fees
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 