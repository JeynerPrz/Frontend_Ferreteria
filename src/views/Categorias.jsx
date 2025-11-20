import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaCategorias from '../components/categorias/TablaCategorias';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroCategoria from '../components/categorias/ModalRegistroCategoria';
import ModalEdicionCategoria from '../components/categorias/ModalEdicionCategoria';
import ModalEliminacionCategoria from '../components/categorias/ModalEliminacionCategoria';
import autoTable from "jspdf-autotable";
import { Zoom, Fade } from 'react-awesome-reveal';

const Categorias = () => {

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion_categoria: ''
  });

  const generarPDFCategorias = () => {
    const doc = new jsPDF();
  
    // Encabezado del PDF
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, 'F');
  
    // Texto centrado en blanco
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de Categorias", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  
    const columnas = ["ID", "Nombre", "Descripción"];
    const filas = categoriasFiltradas.map(categoria => [
      categoria.id_categoria,
      categoria.nombre_categoria,
      categoria.descripcion_categoria
    ]);
  
    const totalPaginas = "{total_pages_count_string}";
  
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
      tableWidth: 'auto',
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
      },
      pageBreak: 'auto',
      rowPageBreak: 'auto',
  
      didDrawPage: function (data) {
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();
        const numeroPagina = doc.internal.getNumberOfPages();
  
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = `Página ${numeroPagina} de ${totalPaginas}`;
        doc.text(piePagina, anchoPagina / 2, alturaPagina - 10, { align: "center" });
      },
    });
  
    // Actualizar el marcador con el total real de páginas
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPaginas);
    }
  
    // Guardar el PDF con nombre y fecha actual
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `categorias_${dia}${mes}${anio}.pdf`;
  
    doc.save(nombreArchivo);
  };

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5; // Número de productos por página

    const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({ ...prev, [name]: value }));
  };

  // Calcular categorias paginadas
const categoriasPaginadas = categoriasFiltradas.slice(
(paginaActual - 1) * elementosPorPagina,
paginaActual * elementosPorPagina
);

  const agregarCategoria = async () => {
    if (!nuevaCategoria.nombre_categoria.trim()) return;

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcategoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCategoria)
      });

      if (!respuesta.ok) throw new Error('Error al guardar');

      // Limpiar y cerrar el modal
      setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
      setMostrarModal(false);

      await obtenerCategorias(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      alert("No se pudo guardar la categoría. Revisa la consola.");
    }
  };


  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias') // Devuelve todas las categorias
      if (!respuesta.ok) {
        throw new Error('Error al obtener las categorias');
      }

      const datos = await respuesta.json();
      setCategorias(datos);
      setCategoriasFiltradas(datos);
      setCargando(false);

    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const abrirModalEdicion = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!categoriaEditada.nombre_categoria.trim()) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarcategoriapatch/${categoriaEditada.id_categoria}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(categoriaEditada),
        }
      );

      if (!respuesta.ok) throw new Error('Error al actualizar');

      setMostrarModalEdicion(false);
      await obtenerCategorias();
    } catch (error) {
      console.error("Error al editar categoría:", error);
      alert("No se pudo actualizar la categoría.");
    }
  };


  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarcategoria/${categoriaAEliminar.id_categoria}`,
        {
          method: 'DELETE',
        }
      );

      if (!respuesta.ok) throw new Error('Error al eliminar');

      setMostrarModalEliminar(false);
      setCategoriaAEliminar(null);
      await obtenerCategorias();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("No se pudo eliminar la categoría.");
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = categorias.filter(
      (categoria) =>
        categoria.nombre_categoria.toLowerCase().includes(texto) ||
        categoria.descripcion_categoria.toLowerCase().includes(texto)
    );

    setCategoriasFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Categorías</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>


        <Col className="text-end">
          <Button
            className='color-boton-registro'
            onClick={() => setMostrarModal(true)}
          >
            + Nueva Categoría
          </Button>
        </Col>

        <Fade cascade triggerOnce delay={10} duration={600}>
        <TablaCategorias
  categorias={categoriasPaginadas}
  cargando={cargando}
  abrirModalEdicion={abrirModalEdicion}
  abrirModalEliminacion={abrirModalEliminacion}
  totalElementos={categorias.length} // Total de categorias
  elementosPorPagina={elementosPorPagina} // Elementos por página
  paginaActual={paginaActual} // Página actual
  establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
/>
</Fade>

        <ModalRegistroCategoria
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCategoria={nuevaCategoria}
          manejarCambioInput={manejarCambioInput}
          agregarCategoria={agregarCategoria}
        />

        <ModalEdicionCategoria
          mostrar={mostrarModalEdicion}             
          setMostrar={setMostrarModalEdicion}        
          categoriaEditada={categoriaEditada}           
          setCategoriaEditada={setCategoriaEditada}    
          guardarEdicion={guardarEdicion}       
        />

        <ModalEliminacionCategoria
          mostrar={mostrarModalEliminar}                
          setMostrar={setMostrarModalEliminar}
          categoria={categoriaAEliminar}           
          confirmarEliminacion={confirmarEliminacion}
        />

      </Container>
      <Col lg ={3} md={4} sm={4} xs={5}>
          <Button 
          className="mb-3"
          onClick={generarPDFCategorias}
          variant="secondary"
          style={{width: "100%"}}
          >
            Generar reporte PDF 
          </Button>
          </Col>
    </>
  );
}



export default Categorias;