import * as React from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../services/cars"; 
import { getModels } from "../../services/models"; 
import { getManufactures } from "../../services/manufactures"; 
import { getTransmissions } from "../../services/transmissions"; 
import { getTypeCars } from "../../services/types";
import {
  faCarSide,
  faGear,
  faGears,
  faIndustry,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/")({
  component: () => (
    <Protected roles={[1]}>
      <Dashboard />
    </Protected>
  ),
});

function Dashboard() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define the number of items per page

  // Fetching data using TanStack Query v5
  const { data: cars = [], isLoading: loadingCars } = useQuery({ 
    queryKey: ['cars'], 
    queryFn: ()=> getCars(),
  });
  const { data: models = [] } = useQuery({ 
    queryKey: ['models'], 
    queryFn: ()=> getModels(), 
  });
  const { data: manufactures = [] } = useQuery({ 
    queryKey: ['manufactures'], 
    queryFn: getManufactures, 
  });
  const { data: transmissions = [] } = useQuery({ 
    queryKey: ['transmissions'], 
    queryFn: getTransmissions, 
  });
  const { data: types = [] } = useQuery({ 
    queryKey: ['types'], 
    queryFn: ()=>getTypeCars(), 
  });

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [token, navigate]);

  if (loadingCars) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  const paginate = (data) => {
    if (!Array.isArray(data)) return []; // Ensure data is an array
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Function to switch pages
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-4">
      <div className="d-flex mb-3 flex-column flex-md-row justify-content-between align-items-center">
        <h4 className="fw-bold mb-md-0">Dashboard</h4>
      </div>

      {/* List Cars */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
        <h5 className="fw-bold mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faCarSide}
            style={{ color: "#0d6efd" }}
            className="me-2"
          />
          List Cars
        </h5>
      </div>
      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Plate</th>
              <th>Model</th>
              <th>Manufacture</th>
              <th>Transmission</th>
              <th>Type</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginate(cars).length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">
                  <strong>Data is not found!</strong>
                </td>
              </tr>
            ) : (
              paginate(cars).map((car, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{car?.plate || "N/A"}</td>
                  <td>
                    {models.find((m) => m.id === car.modelId)?.name || "N/A"}
                  </td>
                  <td>
                    {manufactures.find(
                      (man) =>
                        man.id ===
                        models.find((m) => m.id === car.modelId)?.manufactureId
                    )?.name || "N/A"}
                  </td>
                  <td>
                    {transmissions.find(
                      (tran) =>
                        tran.id ===
                        models.find((m) => m.id === car.modelId)?.transmissionId
                    )?.name || "N/A"}
                  </td>
                  <td>
                    {types.find((t) => t.id === car.typeId)?.name || "N/A"}
                  </td>
                  <td>{car?.description || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination for Cars */}
      {cars.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(cars.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={currentPage === number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(cars.length / itemsPerPage)}
          />
        </Pagination>
      )}

      {/* List Models */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
        <h5 className="fw-bold mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "#0d6efd" }}
            className="me-2"
          />
          List Models
        </h5>
      </div>
      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Model</th>
              <th>Year</th>
              <th>Rent Cost</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginate(models).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <strong>Data is not found!</strong>
                </td>
              </tr>
            ) : (
              paginate(models).map((model, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{model?.name}</td>
                  <td>{model?.year}</td>
                  <td>{model?.rentPerDay}</td>
                  <td>{model?.createdAt}</td>
                  <td>{model?.updatedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination for Models */}
      {models.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(models.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={currentPage === number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(models.length / itemsPerPage)}
          />
        </Pagination>
      )}

      {/* List Manufactures */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h5 className="fw -bold mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faIndustry}
            style={{ color: "#0d6efd" }}
            className="me-2"
          />
          List Manufactures
        </h5>
      </div>
      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Manufacture</th>
              <th>Country</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginate(manufactures).length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <strong>Data is not found!</strong>
                </td>
              </tr>
            ) : (
              paginate(manufactures).map((manufacture, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{manufacture?.name}</td>
                  <td>{manufacture?.country}</td>
                  <td>{manufacture?.createdAt}</td>
                  <td>{manufacture?.updatedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination for Manufactures */}
      {manufactures.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(manufactures.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={currentPage === number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(manufactures.length / itemsPerPage)}
          />
        </Pagination>
      )}

      {/* List Transmissions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h5 className="fw-bold mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faWrench}
            style={{ color: "#0d6efd" }}
            className="me-2"
          />
          List Transmissions
        </h5>
      </div>
      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Transmission</th>
              <th>Driver Type</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginate(transmissions).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <strong>Data is not found!</strong>
                </td>
              </tr>
            ) : (
              paginate(transmissions).map((transmission, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{transmission?.name}</td>
                  <td>{transmission?.driveType}</td>
                  <td>{transmission?.description}</td>
                  <td>{transmission?.createdAt}</td>
                  <td>{transmission?.updatedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination for Transmissions */}
      {transmissions.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(transmissions.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={currentPage === number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled ={currentPage === Math.ceil(transmissions.length / itemsPerPage)}
          />
        </Pagination>
      )}

      {/* List Types */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h5 className="fw-bold mb-3 mb-md-0">
          <FontAwesomeIcon
            icon={faGears}
            style={{ color: "#0d6efd" }}
            className="me-2"
          />
          List Types
        </h5>
      </div>
      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginate(types).length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <strong>Data is not found!</strong>
                </td>
              </tr>
            ) : (
              paginate(types).map((type, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{type?.name}</td>
                  <td>{type?.description}</td>
                  <td>{type?.capacity}</td>
                  <td>{type?.createdAt}</td>
                  <td>{type?.updatedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination for Types */}
      {types.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(types.length / itemsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={currentPage === number + 1}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(types.length / itemsPerPage)}
          />
        </Pagination>
      )}
    </Container>
  );
}