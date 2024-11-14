import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPencil } from "@fortawesome/free-solid-svg-icons";

const TypeItem = ({ type, index }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <tr>
      <td>{index}</td>
      <td>{type?.name}</td>
      <td>{type?.description}</td>
      <td>{type?.capacity}</td>
      <td className="text-center">
        <ButtonGroup>
          <Button
            as={Link}
            to={`/types/${type?.id}`}
            variant="primary"
            className="me-2"
          >
            <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
            Detail
          </Button>
          {user?.roleId === 1 && (
            <Button
              as={Link}
              to={`/types/edit/${type?.id}`}
              variant="warning"
              className="me-2"
            >
              <FontAwesomeIcon icon={faPencil} className="me-2" />
              Edit
            </Button>
          )}
        </ButtonGroup>
      </td>
    </tr>
  );
};

TypeItem.propTypes = {
  type: PropTypes.object,
};

export default TypeItem;
