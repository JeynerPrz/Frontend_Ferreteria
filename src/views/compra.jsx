import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TablaCompras from '../components/compra/TablaCompras';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';



const Compra = () => {

  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/compra') // Devuelve todas las compras
      if (!respuesta.ok) {
        throw new Error('Error al obtener las compras');
      }

      const datos = await respuesta.json();
      setCompras(datos);
      setComprasFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = (e.target.value || '').toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = compras.filter((compra) => {
      const idEmp = String(compra.id_empleado || '').toLowerCase();
      const fecha = (compra.fecha_compra || '').toLowerCase();
      const total = String(compra.total_compra || '').toLowerCase();
      return idEmp.includes(texto) || fecha.includes(texto) || total.includes(texto);
    });
    setComprasFiltradas(filtradas);
  };


  useEffect(() => {
    obtenerCompras();
  }, []);


  return (
    <>
      <Container className="mt-4">
        <h4>Compras</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaCompras
          compras={comprasFiltradas}
          cargando={cargando}
        />
      </Container>
    </>
  );
}
export default Compra;