import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { createTypeCar } from '../../services/types'
import Protected from '../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/types/create')({
  component: () => (
    <Protected roles={[1]}>
      <CreateTypeCar />
    </Protected>
  ),
})

function CreateTypeCar() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [capacity, setCapacity] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    // Ensure capacity is a number
    const request = {
      name,
      description,
      capacity: parseInt(capacity, 10), // Convert to number
    }

    const result = await createTypeCar(request)
    if (result?.success) {
      navigate({ to: '/types' })
      toast.success('Car type created successfully!')
      return
    }

    toast.error(result?.message)
  }

  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/types">Types</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="fw-bold mb-3">Add Car Type</h4>
      <Row className="mt-5">
        <Col md={9}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Add Car Type Data
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3} className="fw-semibold">
                    Name
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Please enter the name of Car Type"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3} className="fw-semibold">
                    Description
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Please enter the description of Car Type"
                      required
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3} className="fw-semibold">
                    Capacity
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      required
                      value={capacity}
                      onChange={(event) => {
                        setCapacity(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className="mt-4">
                  <Col className="text-primary">
                    <Button variant="primary" type="submit" className="me-2">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
