import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
}) => {
  return (
    <Modal backdrop='static'
     show={mostrarModal} onHide={() => setMostrarModal(false)} 
     centered
     >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="primernombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

    <Form.Group className="mb-3" controlId="segundonombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

              <Form.Group className="mb-3" controlId="primerapellido">
            <Form.Label>Primer apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={ nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

              <Form.Group className="mb-3" controlId="segundoapellido">
            <Form.Label>Segundo apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={ nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

              <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name= "celular"
              value={ nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

            <Form.Group className="mb-3" controlId="direccion">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              type="text"
              name= "direccion"
              value={ nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

          
            <Form.Group className="mb-3" controlId="cedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              name= "cedula"
              value={ nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ej: Herramientas"
              maxLength={20}
              required
            />
          </Form.Group>


        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarCliente}
          disabled={!nuevoCliente.primer_nombre?.trim()}
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;