import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalRegistroCompra = ({
  mostrar,
  setMostrar,
  nuevaCompra,
  setNuevaCompra,
  detalles,
  setDetalles,
  empleados,
  productos,
  agregarCompra,
  hoy,
}) => {
  // Agregar nuevo detalle vacío
  const agregarDetalle = () => {
    setDetalles([...detalles, { id_producto: "", cantidad: 1, precio_unitario: 0 }]);
  };

  // Actualizar detalle específico
  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][campo] = campo === "cantidad" || campo === "precio_unitario" ? Number(valor) : valor;
    setDetalles(nuevosDetalles);
  };

  // Eliminar detalle
  const eliminarDetalle = (index) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="empleadoSelect">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              value={nuevaCompra.id_empleado}
              onChange={(e) =>
                setNuevaCompra({ ...nuevaCompra, id_empleado: e.target.value })
              }
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
              max={hoy}
              value={nuevaCompra.fecha_compra}
              onChange={(e) =>
                setNuevaCompra({ ...nuevaCompra, fecha_compra: e.target.value })
              }
            />
          </Form.Group>

          <hr />
          <h5>Detalles de Compra</h5>
          {detalles.length === 0 && <p>No hay detalles agregados</p>}

          {detalles.map((detalle, index) => (
            <Row key={index} className="align-items-center mb-2">
              <Col md={5}>
                <Form.Select
                  value={detalle.id_producto}
                  onChange={(e) =>
                    actualizarDetalle(index, "id_producto", e.target.value)
                  }
                >
                  <option value="">Seleccione producto</option>
                  {productos.map((prod) => (
                    <option key={prod.id_producto} value={prod.id_producto}>
                      {prod.nombre_producto}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  min="1"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    actualizarDetalle(index, "cantidad", e.target.value)
                  }
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  value={detalle.precio_unitario}
                  onChange={(e) =>
                    actualizarDetalle(index, "precio_unitario", e.target.value)
                  }
                />
              </Col>
              <Col md={1}>
                <Button
                  variant="danger"
                  onClick={() => eliminarDetalle(index)}
                  title="Eliminar detalle"
                >
                  X
                </Button>
              </Col>
            </Row>
          ))}

          <Button variant="secondary" onClick={agregarDetalle} className="mb-3">
            + Agregar detalle
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCompra}>
          Guardar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;
