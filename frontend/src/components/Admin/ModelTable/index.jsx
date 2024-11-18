// components/TableCRUD.jsx
import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const TableCRUD = ({ model }) => {
  return (
    <tr>
      <td>{model?.name}</td>
      <td>{model?.manufactures?.name}</td>
      <td>{model?.manufactures?.country}</td>
      <td>{model?.transmissions?.name}</td>
      <td>{model?.year}</td>
      <td>Rp {model?.rentPerDay?.toLocaleString("id-ID")},00</td>
      <td className="d-flex justify-content-center">
        <Button
          as={Link}
          to={`/models/${model?.id}`}
          className="py-2 px-3 bg-primary rounded-0 mb-2 fw-semibold text-white border-primary"
          size="md"
        >
          Model Details
        </Button>
      </td>
    </tr>
  );
};

export default TableCRUD;
