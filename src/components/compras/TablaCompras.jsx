import React from "react";

const TablaCompras = ({
  compras,
  cargando,
  obtenerDetalles,
  abrirModalEdicion,
  abrirModalEliminacion,
}) => {
  if (cargando) return <p>Cargando compras...</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID Compra</th>
          <th>Empleado</th>
          <th>Fecha Compra</th>
          <th>Total Compra</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center">
              No hay compras registradas
            </td>
          </tr>
        ) : (
          compras.map((compra) => (
            <tr key={compra.id_compra}>
              <td>{compra.id_compra}</td>
              <td>{compra.id_empleado}</td>
              <td>{compra.fecha_compra.split("T")[0]}</td>
              <td>C$ {compra.total_compra.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-1"
                  onClick={() => obtenerDetalles(compra.id_compra)}
                >
                  Detalles
                </button>
                <button
                  className="btn btn-warning btn-sm me-1"
                  onClick={() => abrirModalEdicion(compra)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => abrirModalEliminacion(compra)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablaCompras;
