import { Modal, Form, Button } from "react-bootstrap";


const ModalRegistroUsuario = ({
  mostrarModal,
  setMostrarModal,
  nuevoUsuario,
  manejarCambioInput,
  agregarUsuario,
}) => {
  return (
    <Modal
     backdrop ='static'
      show={mostrarModal} onHide={() => setMostrarModal(false)} 
      centered
      
      >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="Usuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={nuevoUsuario.usuario}
              onChange={manejarCambioInput}
              placeholder="Ej: Hassel24"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcionUsuario">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              rows={3}
              name="contraseña"
              value={nuevoUsuario.contraseña}
              onChange={manejarCambioInput}
              placeholder="Ingrese la contraseña"
              maxLength={100}
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
          onClick={agregarUsuario}
          disabled={!nuevoUsuario.usuario.trim()}
        >
          Guardar Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroUsuario;