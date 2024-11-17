import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router'
import {
  updateTransmission,
  getDetailTransmission,
} from '../../../../services/transmissions'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@tanstack/react-query";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'
import Protected from '../../../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/transmissions/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditTransmission />
    </Protected>
  ),
})

function EditTransmission() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [driveType, setDriveType] = useState('')
  const [description, setDescription] = useState('')

  // Use react query to fetch API
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["transmissions", id],
    queryFn: () => getDetailTransmission(id),
    enabled: !!id,
  });

  useEffect(() => {
     if (isSuccess && data) {
        setName(data.name)
        setDriveType(data.driveType)
        setDescription(data.description)
      }
  }, [isSuccess, data])

  if (isError) {
    navigate({ to: '/admin/transmissions' })
    return
  }

  // Adjust mutation function to include id correctly
  const { mutate: updateTransmissionData } = useMutation({
    mutationFn: (transmission) => updateTransmission(id, transmission), // Pass id from useParams
    onSuccess: () => {
        toast.success("Transmission updated successfully!");
        navigate({ to: `/admin/transmissions` });
    },
    onError: (err) => {
        toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      name,
      driveType,
      description,
    };
    
    updateTransmissionData(request);
  }
  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/transmissions">Transmissions</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/admin/transmissions/${id}`}>Detail</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="fw-bold mb-3">Update Transmission</h4>
      <Row className="mt-5">
        <Col md={9}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Update Transmission
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-4" controlId="name">
                  <Form.Label column sm={3} className="fw-semibold">
                    Name :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="driveType">
                  <Form.Label column sm={3} className="fw-semibold">
                    Drive Type :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Drive Type"
                      required
                      value={driveType}
                      onChange={(event) => {
                        setDriveType(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="description">
                  <Form.Label column sm={3} className="fw-semibold">
                    Description :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Description"
                      required
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" className="me-2">
                      Edit Transmission
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
