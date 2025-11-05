import {Table, Spinner} from "react-bootstrap";

const TablaProductos = ({productos, cargando}) => {

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
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       {productos.map((producto) => {
        return (
          <tr key ={producto.id_producto}> 
          <td>{producto.id_producto}</td>
            <td>{producto.nombre_producto}</td>
             <td>{producto.descripcion_producto}</td>
            <td>{producto.id_categoria}</td>
             <td>{producto.precio_unitario}</td>
             <td>{producto.stock}</td>
             <td>{producto.imagen}</td>
            <td>Acción</td>
          </tr>
        );
       })}
      </tbody>
    </Table>
    </>
  );

}



export default TablaProductos;