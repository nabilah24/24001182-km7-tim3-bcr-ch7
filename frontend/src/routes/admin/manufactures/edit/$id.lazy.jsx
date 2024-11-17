import { createLazyFileRoute, useNavigate, Link } from '@tanstack/react-router'
import {
  updateManufacture,
  getDetailManufacture,
} from '../../../../services/manufactures'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'
import Protected from '../../../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/manufactures/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditManufacture />
    </Protected>
  ),
})

function EditManufacture() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')

  // Use react query to fetch API
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["manufactures", id],
    queryFn: () => getDetailManufacture(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
       setName(data.name)
       setCountry(data.country)
     }
 }, [isSuccess, data])

  if (isError) {
    navigate({ to: '/manufactures' })
    return
  }

  // Adjust mutation function to include id correctly
  const { mutate: updateManufactureData } = useMutation({
    mutationFn: (manufacture) => updateManufacture(id, manufacture), // Pass id from useParams
    onSuccess: () => {
        toast.success("Manufacture updated successfully!");
        navigate({ to: `/admin/manufactures` });
    },
    onError: (err) => {
        toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      name,
      country,
    }
    
    updateManufactureData(request);
  }
  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/manufactures">Manufactures</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/admin/manufactures/${id}`}>Detail</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="fw-bold mb-3">Update Manufacture</h4>
      <Row className="mt-5">
        <Col md={9}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Update Manufacture
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
                <Form.Group as={Row} className="mb-4" controlId="country">
                  <Form.Label column sm={3} className="fw-semibold">
                    Country :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="country"
                      required
                      value={country}
                      onChange={(event) => {
                        setCountry(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button variant="primary" type="submit" className="me-2">
                      Edit Manufacture
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
