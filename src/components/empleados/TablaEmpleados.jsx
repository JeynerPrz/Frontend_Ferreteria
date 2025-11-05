import React, { useState } from "react";
import {Table, Spinner} from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaEmpleados = ({empleados, cargando}) => {

  const [orden, setOrden] = useState({ campo: "id_empleado", direccion: "asc" });

  const manejarOrden = (campo) => {
  setOrden((prev) => ({
    campo,
    direccion:
      prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
  }));
};

const EmpleadosOrdenados = [...empleados].sort((a, b) => {
  const valorA = a[orden.campo];
  const valorB = b[orden.campo];

  if (typeof valorA === "number" && typeof valorB === "number") {
    return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
  }

  const comparacion = String(valorA).localeCompare(String(valorB));
  return orden.direccion === "asc" ? comparacion : -comparacion;
});



  if (cargando){
    return (
        <>
          <Spinner animation = "border">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </>
    );
  }

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
   <BotonOrden campo="id_empleado" orden={orden} manejarOrden={manejarOrden}>
  ID
</BotonOrden>

<BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
 Primer Nombre
</BotonOrden>

<BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
Segundo Nombre
</BotonOrden>

<BotonOrden campo= "primer_apellido" orden={orden} manejarOrden={manejarOrden}>
 Primer Apellido
</BotonOrden>

<BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
Segundo Apellido
</BotonOrden>

<BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
 Celular
</BotonOrden>

<BotonOrden campo="cargo" orden={orden} manejarOrden={manejarOrden}>
Cargo
</BotonOrden>

<BotonOrden campo= "cedula" orden={orden} manejarOrden={manejarOrden}>
 Cedula
</BotonOrden>

<BotonOrden campo="fecha_contratacion" orden={orden} manejarOrden={manejarOrden}>
Fecha Contratacion
</BotonOrden>

          <th>Acciónes</th>
        </tr>
      </thead>
      <tbody>
       {empleados.map((empleado) => {
        return (
          <tr key ={empleado.id_empleado}> 
          <td>{empleado.id_empleado}</td>
            <td>{empleado.primer_nombre}</td>
             <td>{empleado.segundo_nombre}</td>
            <td>{empleado.primer_apellido}</td>
             <td>{empleado.segundo_apellido}</td>
             <td>{empleado.celular}</td>
             <td>{empleado.cargo}</td>
             <td>{empleado.cedula}</td>
             <td>{empleado.fecha_contratacion}</td>
            <td>Acción</td>
          </tr>
        );
       })}
      </tbody>
    </Table>
    </>
  );

}



export default TablaEmpleados;