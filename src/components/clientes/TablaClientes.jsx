import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import React, { useState } from 'react';
import Paginacion from "../ordenamiento/Paginacion";

const TablaClientes = ({
  clientes,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual
}) => {

  const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });

  const manejarOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      direccion:
        prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
    }));
  };

  const clientesOrdenados = [...clientes].sort((a, b) => {
    const valorA = a[orden.campo];
    const valorB = b[orden.campo];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
    }

    const comparacion = String(valorA).localeCompare(String(valorB));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <>
        <Spinner animation="border">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </>
    );
  }

  return (
    <>
      <Table variant="primary" striped bordered hover>
        <thead>
          <tr>
            <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>
            <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
              Primer nombre
            </BotonOrden>

            <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
              Segundo nombre
            </BotonOrden>

            <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
              Primer apellido
            </BotonOrden>

            <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
              Segundo apellido
            </BotonOrden>

            <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
              Celular
            </BotonOrden>

            <BotonOrden campo="direccion" orden={orden} manejarOrden={manejarOrden}>
              Direccion
            </BotonOrden>

            <BotonOrden campo="cedula" orden={orden} manejarOrden={manejarOrden}>
              Cedula
            </BotonOrden>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesOrdenados.map((cliente) => {
            return (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.primer_nombre}</td>
                <td>{cliente.segundo_nombre}</td>
                <td>{cliente.primer_apellido}</td>
                <td>{cliente.segundo_apellido}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.cedula}</td>
                <td>
                  <Button
                                    variant="outline-warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => abrirModalEdicion(cliente)}
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => abrirModalEliminacion(cliente)}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
}
export default TablaClientes;