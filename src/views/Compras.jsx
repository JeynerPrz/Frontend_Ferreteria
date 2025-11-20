// src/views/Compras.jsx  →  VERSIÓN INDESTRUCTIBLE
import { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

import TablaCompras from "../components/compras/TablaCompras";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalDetallesCompra from "../components/detalles_compras/ModalDetallesCompra";
import ModalRegistroCompra from "../components/compras/ModalRegistroCompra";
import ModalEdicionCompra from "../components/compras/ModalEdicionCompra";
import ModalEliminacionCompra from "../components/compras/ModalEliminacionCompra";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [comprasFiltradas, setComprasFiltradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [showDetalle, setShowDetalle] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showEdicion, setShowEdicion] = useState(false);
  const [showEliminacion, setShowEliminacion] = useState(false);

  const [detallesCompra, setDetallesCompra] = useState([]);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const cargarCompras = async () => {
      try {
        const res = await axios.get(`${API_URL}/compras`);
        console.log("RESPUESTA COMPLETA DEL BACKEND:", res.data);

        const comprasProcesadas = await Promise.all(
          res.data.map(async (compra) => {
            // DETECTA EL ID AUTOMÁTICAMENTE (funciona aunque el backend esté mal)
            const id = 
              compra.ID_Compra || 
              compra.id_compra || 
              compra.idCompra || 
              compra.id || 
              compra.compra_id || 
              compra.IdCompra || 
              compra._id;

            console.log(`Compra procesada → ID detectado: ${id}`, compra);

            if (!id) {
              return { ...compra, detalles: [], idCompra: "sin-id" };
            }

            try {
              const det = await axios.get(`${API_URL}/compras/${id}/detalles`);
              return { ...compra, detalles: det.data || [], idCompra: id };
            } catch {
              return { ...compra, detalles: [], idCompra: id };
            }
          })
        );

        setCompras(comprasProcesadas);
        setComprasFiltradas(comprasProcesadas);
      } catch (err) {
        console.error("Error total:", err);
        alert("Backend apagado o ruta mala");
      } finally {
        setCargando(false);
      }
    };

    cargarCompras();
  }, []);

  // Búsqueda
  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setComprasFiltradas(compras);
      return;
    }
    setComprasFiltradas(
      compras.filter(c =>
        String(c.idCompra || c.ID_Compra || "").includes(textoBusqueda) ||
        (c.Proveedor || "").toLowerCase().includes(textoBusqueda.toLowerCase()) ||
        (c.Fecha_Compra || "").includes(textoBusqueda)
      )
    );
  }, [textoBusqueda, compras]);

  const verDetalle = (compra => {
    setDetallesCompra(compra.detalles || []);
    setShowDetalle(true);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">Gestión de Compras</h2>
        <Button variant="success" size="lg" onClick={() => setShowRegistro(true)}>
          + Nueva Compra
        </Button>
      </div>

      <Row className="mb-4">
        <Col lg={6}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={e => setTextoBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      <TablaCompras
        compras={comprasFiltradas}
        cargando={cargando}
        onVerDetalle={verDetalle}
        onEditar={c => { setCompraSeleccionada(c); setShowEdicion(true); }}
        onEliminar={c => { setCompraSeleccionada(c); setShowEliminacion(true); }}
      />

      <ModalDetallesCompra mostrarModal={showDetalle} setMostrarModal={setShowDetalle} detalles={detallesCompra} />
      <ModalRegistroCompra mostrar={showRegistro} setMostrar={setShowRegistro} />
      <ModalEdicionCompra mostrar={showEdicion} setMostrar={setShowEdicion} compra={compraSeleccionada} />
      <ModalEliminacionCompra mostrar={showEliminacion} setMostrar={setShowEliminacion} compra={compraSeleccionada} />
    </Container>
  );
};

export default Compras;