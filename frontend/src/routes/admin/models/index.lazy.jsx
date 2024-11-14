import { useState, useEffect, useMemo } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Breadcrumb, Button, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getModels } from "../../../services/models";
import ModelTable from "../../../components/ModelTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Route = createLazyFileRoute("/admin/models/")({
  component: ModelsIndex,
});

function ModelsIndex() {
  const { user, token } = useSelector((state) => state.auth);

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getModelsData = async () => {
      setLoading(true);

      const result = await getModels();

      if (result.success) {
        setModels(result.data);
      }
      setLoading(false);
    };

    // Check if there any token
    if (token) {
      getModelsData();
    } else {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  if (loading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <Container className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Models</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex justify-content-between">
        <div>
          <h4 className="fw-bold">Models List</h4>
        </div>
        <div>
          {user && user?.roleId === 1 && (
            <Button
              variant="primary"
              className="rounded-0"
              as={Link}
              to="/models/create"
            >
              <FontAwesomeIcon icon={faPlus} className="me-3" />
              <span>Create Model</span>
            </Button>
          )}
        </div>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacture</th>
            <th>Country</th>
            <th>Transmission</th>
            <th>Year</th>
            <th>Rent Per Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.length === 0 ? (
            <h1>Models data is not found!</h1>
          ) : (
            models.map((model) => <ModelTable model={model} key={model?.id} />)
          )}
        </tbody>
      </Table>
    </Container>
  );
}
