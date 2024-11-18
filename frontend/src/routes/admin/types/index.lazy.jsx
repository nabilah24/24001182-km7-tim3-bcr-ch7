import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getTypeCars } from "../../../services/types/index";
import { useQuery } from "@tanstack/react-query";
import TypeItem from "../../../components/Type/typeItem";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/admin/types/")({
  component: () => (
    <Protected roles={[1]}>
      <TypeIndex />
    </Protected>
  ),
});

function TypeIndex() {
  const { user, token } = useSelector((state) => state.auth);

  const [types, setTypeCars] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Tentukan jumlah item per halaman

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["types"],
    queryFn: () => getTypeCars(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      const sortedTypes = data.sort((a, b) => a.id - b.id);
      setTypeCars(sortedTypes);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get car type data!
          </h1>
        </Col>
      </Row>
    );
  }

  if (isPending) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="visualy-hidden"></span>
          </Spinner>
        </Col>
      </Row>
    );
  }

  // Hitung total halaman dan item yang ditampilkan berdasarkan halaman
  const totalPages = Math.ceil(types.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = types.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk beralih halaman
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Types</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h4 className="fw-bold mb-3 mb-md-0">Car Type List</h4>
        {user?.roleId === 1 && (
          <Button
            as={Link}
            href={`/admin/types/create`}
            variant="primary"
            className="rounded-0"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>Add Type Car</span>
          </Button>
        )}
      </div>

      <div className="table-responsive mt-4">
        <Table bordered hover className="mb-0">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  <strong>Car type data is not found!</strong>
                </td>
              </tr>
            ) : (
              currentItems.map((type, index) => (
                <TypeItem
                  type={type}
                  key={type?.id}
                  index={(currentPage - 1) * itemsPerPage + index + 1}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
      {types.length > 0 && (
        <Pagination className="mt-4 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={currentPage === number + 1}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
}
