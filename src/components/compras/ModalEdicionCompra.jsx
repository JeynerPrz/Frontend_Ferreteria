import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const API_URL = "http://localhost:3000/api";

const ModalEdicionCompra = ({ mostrar, setMostrar, compra, empleados }) => {
  const [formData, setFormData] = useState({
    id_empleado: "",
    fecha_compra: "",
    total_compra: 0,
  });

  useEffect(() => {
    if (compra) {
      setFormData({
        id_empleado: compra.id_empleado || "",
        fecha_compra: compra.fecha_compra ? compra.fecha_compra.split("T")[0] : "",
        total_compra: compra.total_compra || 0,
      });
    }
  }, [compra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const actualizarCompra = async () => {
    try {
      const res = await fetch(
        `${API_URL}/actualizarcomprapatch/${compra.id_compra}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Error actualizando compra");
      alert("Compra actualizada");
      setMostrar(false);
    } catch (error) {
      alert("Error al actualizar compra");
      console.error(error);
    }
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="empleadoSelect">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={formData.id_empleado}
              onChange={handleChange}
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((emp) => (
                <option key={emp.id_empleado} value={emp.id_empleado}>
                  {emp.primer_nombre} {emp.primer_apellido}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaCompra">
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fecha_compra"
              value={formData.fecha_compra}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="totalCompra">
            <Form.Label>Total Compra</Form.Label>
            <Form.Control
              type="number"
              name="total_compra"
              value={formData.total_compra}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarCompra}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCompra;
