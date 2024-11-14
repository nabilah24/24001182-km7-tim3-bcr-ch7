import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { deleteTransmission } from '../../services/transmissions'
import { getDetailTransmission } from '../../services/transmissions'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

export const Route = createLazyFileRoute('/admin/transmissions/$id')({
  component: TransmissionDetail,
})

function TransmissionDetail() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [transmission, setTransmission] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const getDetailTransmissionData = async (id) => {
      setIsLoading(true)
      const result = await getDetailTransmission(id)
      if (result?.success) {
        setTransmission(result.data)
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
      setIsLoading(false)
    }

    if (id) {
      getDetailTransmissionData(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </Col>
      </Row>
    )
  }

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Transmission is not found!</h1>
        </Col>
      </Row>
    )
  }

  const onDelete = async (event) => {
    event.preventDefault()

    Swal.fire({
      title: 'Confirm to delete',
      text: 'Are you sure to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#0d6efd',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResult = await deleteTransmission(id)
        if (deleteResult?.success) {
          navigate({ to: '/transmissions' })
        } else {
          toast.error(deleteResult?.message)
        }
      }
    })
  }

  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/transmissions">Transmissions</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Detail</Breadcrumb.Item>
      </Breadcrumb>
      <h4 className="fw-bold mb-3">Transmission Detail</h4>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Transmission Information
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <strong>Name : </strong>
                {transmission?.name}
              </Card.Title>
              <Card.Text>
                <strong>Drive Type :</strong> {transmission?.driveType}
              </Card.Text>
              <Card.Text>
                <strong>Description :</strong> {transmission?.description}
              </Card.Text>
            </Card.Body>
            <div className="text-center mb-3">
              {user?.roleId === 1 && (
                <Button
                  onClick={onDelete}
                  variant="danger"
                  className="px-5 py-2 mt-2"
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
