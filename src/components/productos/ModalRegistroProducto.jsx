import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre_producto">
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_producto"
                  value={nuevoProducto.nombre_producto}
                  onChange={manejarCambioInput}
                  maxLength={20}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="descripcion_producto">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  name="descripcion_producto"
                  value={nuevoProducto.descripcion_producto}
                  onChange={manejarCambioInput}
                  maxLength={20}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="id_categoria">
                <Form.Label>ID Categoría*</Form.Label>
                <Form.Control
                  type="number"
                  name="id_categoria"
                  value={nuevoProducto.id_categoria}
                  onChange={manejarCambioInput}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="precio_unitario">
                <Form.Label>Precio Unitario</Form.Label>
                <Form.Control
                  type="number"
                  name="precio_unitario"
                  value={nuevoProducto.precio_unitario}
                  onChange={manejarCambioInput}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>

              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={nuevoProducto.stock}
                  onChange={manejarCambioInput}
                  placeholder="20"
                />
              </Form.Group>

            </Col>
            <Col md={6}>

              <Form.Group className="mb-3" controlId="formImagenProducto">
  <Form.Label>Imagen</Form.Label>
  <Form.Control
    type="file"
    name="imagen"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          manejarCambioInput({
            target: { name: 'imagen', value: reader.result.split(',')[1] } // Extrae solo la parte Base64
          });
        };
        reader.readAsDataURL(file);
      }
    }}
  />
</Form.Group>


            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarProducto}
          disabled={!nuevoProducto.nombre_producto.trim() 
            || !nuevoProducto.stock
            || !nuevoProducto.precio_unitario}
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;