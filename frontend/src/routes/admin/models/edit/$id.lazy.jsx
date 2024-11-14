import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getManufactures } from '../../../services/manufactures'
import { getTransmissions } from '../../../services/transmissions'
import { getModelDetail, updateModel } from '../../../services/models'
import { toast } from 'react-toastify'
import Protected from '../../../components/Auth/Protected'
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap'

export const Route = createLazyFileRoute('/admin/models/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditModel />
    </Protected>
  ),
})

function EditModel() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [manufactures, setManufactures] = useState([])
  const [manufactureId, setManufactureId] = useState(0)
  const [transmissions, setTransmissions] = useState([])
  const [transmissionId, setTransmissionId] = useState(0)
  const [year, setYear] = useState(null)
  const [rentPerDay, setRentPerDay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

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

  useEffect(() => {
    const getModelDetailData = async (id) => {
      setLoading(true)
      const result = await getModelDetail(id)
      if (result?.success) {
        setName(result.data.name)
        setManufactureId(result.data.manufactureId)
        setTransmissionId(result.data.transmissionId)
        setYear(result.data.year)
        setRentPerDay(result.data.rentPerDay)
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
      setLoading(false)
    }

    if (id) {
      getModelDetailData(id)
    }
  }, [id])

  if (isNotFound) {
    navigate({ to: '/models' })
    return
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      name,
      manufactureId,
      transmissionId,
      year,
      rentPerDay,
    }
    const result = await updateModel(id, request)
    if (result?.success) {
      navigate({ to: `/models/${id}` })
      return
    }

    toast.error(result?.message)
  }

  return (
    <Container className="my-4 mx-0">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/models">Models</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/models/${id}`}>Detail</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Edit</Breadcrumb.Item>
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
                      {!loading &&
                        manufactures.length > 0 &&
                        manufactures.map((manufacture) => (
                          <option
                            key={manufacture?.id}
                            value={manufacture?.id}
                            selected={manufacture.id == manufactureId}
                          >
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
                      {!loading &&
                        transmissions.length > 0 &&
                        transmissions.map((transmission) => (
                          <option
                            key={transmission?.id}
                            value={transmission?.id}
                            selected={transmission.id == transmissionId}
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
                    Submit
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
