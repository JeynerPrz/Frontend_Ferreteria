import { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';


const Producto = () => {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);


  const [productosFiltradas, setProductosFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/producto') // Devuelve todas los productos
      if (!respuesta.ok) {
        throw new Error('Error al obtener las productos');
      }

      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto) ||
        producto.id_categoria == texto ||
        producto.stock == texto ||
        producto.precio_unitario == texto
    );
    setProductosFiltradas(filtradas);
  };


  useEffect(() => {
    obtenerProductos();
  }, []);


  return (
    <>
      <Container className="mt-4">
        <h4>Producto</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaProductos
          productos={productosFiltradas}
          cargando={cargando}
        />
      </Container>
    </>
  );
}
export default Producto;