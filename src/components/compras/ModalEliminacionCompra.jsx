import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCompra = ({ mostrar, setMostrar, compra, confirmarEliminacion }) => {
  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {compra ? (
          <p>
            ¿Está seguro que desea eliminar la compra con ID:{" "}
            <strong>{compra.id_compra}</strong>?
          </p>
        ) : (
          <p>No hay compra seleccionada</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={confirmarEliminacion}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCompra;
