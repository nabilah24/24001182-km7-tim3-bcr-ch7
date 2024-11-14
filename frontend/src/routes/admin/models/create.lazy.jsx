import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getManufactures } from '../../services/manufactures'
import { getTransmissions } from '../../services/transmissions'
import { createModel } from '../../services/models'
import { toast } from 'react-toastify'
import Protected from '../../components/Auth/Protected'
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Breadcrumb,
  Container,
} from 'react-bootstrap'

export const Route = createLazyFileRoute('/admin/models/create')({
  component: () => (
    <Protected roles={[1]}>
      <CreateCar />
    </Protected>
  ),
})

function CreateCar() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [manufactures, setManufactures] = useState([])
  const [manufactureId, setManufactureId] = useState(0)
  const [transmissions, setTransmissions] = useState([])
  const [transmissionId, setTransmissionId] = useState(0)
  const [year, setYear] = useState(null)
  const [rentPerDay, setRentPerDay] = useState(null)

  useEffect(() => {
    const getManufacturesData = async () => {
      const result = await getManufactures()
      if (result?.success) {
        setManufactures(result?.data)
      }
    }
    const getTransmissionsData = async () => {
      const result = await getTransmissions()
      if (result?.success) {
        setTransmissions(result?.data)
      }
    }

    getManufacturesData()
    getTransmissionsData()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      name,
      manufactureId,
      transmissionId,
      year,
      rentPerDay,
    }
    const result = await createModel(request)
    if (result?.success) {
      navigate({ to: '/models' })
      return
    }

    toast.error(result?.message)
  }

  return (
    <Container className="my-4 mx-0">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/models">Models</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-3 w-100 justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header className="text-center fw-bold fs-5">
              Add Model
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {/* Name */}
                <Form.Group as={Col} className="mb-3" controlId="name">
                  <Form.Label row sm={3}>
                    Name
                  </Form.Label>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Model Name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Manufactures */}
                <Form.Group as={Col} className="mb-3" controlId="model">
                  <Form.Label row sm={3}>
                    Manufacture
                  </Form.Label>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) => setManufactureId(event.target.value)}
                      defaultValue="selected"
                      required
                    >
                      <option disabled value="selected">
                        Select Manufacture
                      </option>
                      {manufactures.length > 0 &&
                        manufactures.map((manufacture) => (
                          <option key={manufacture?.id} value={manufacture?.id}>
                            {manufacture?.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Transmissions */}
                <Form.Group as={Col} className="mb-3" controlId="transmission">
                  <Form.Label row sm={3}>
                    Transmission
                  </Form.Label>
                  <Col>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(event) =>
                        setTransmissionId(event.target.value)
                      }
                      defaultValue="selected"
                      required
                    >
                      <option disabled value="selected">
                        Select Transmission
                      </option>
                      {transmissions.length > 0 &&
                        transmissions.map((transmission) => (
                          <option
                            key={transmission?.id}
                            value={transmission?.id}
                          >
                            {transmission?.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* year */}
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    placeholder="Enter Year"
                  />
                </Form.Group>

                {/* rentPerDay */}
                <Form.Group controlId="rentPerDay" className="mt-3">
                  <Form.Label>Rent per Day</Form.Label>
                  <Form.Control
                    type="number"
                    value={rentPerDay}
                    onChange={(event) => setRentPerDay(event.target.value)}
                    placeholder="Enter Rent Per Day"
                  />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  )
}
