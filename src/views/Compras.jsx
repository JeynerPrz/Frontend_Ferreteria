import { useEffect, useState } from "react";
import TablaCompras from "../components/compras/TablaCompras";
import ModalRegistroCompra from "../components/compras/ModalRegistroCompra";
import ModalEdicionCompra from "../components/compras/ModalEdicionCompra";
import ModalEliminacionCompra from "../components/compras/ModalEliminacionCompra";
import ModalDetallesCompras from "../components/detalles_compras/ModalDetallesCompras";

const API_URL = "http://localhost:3000/api";

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(false);

  const [modalRegistroMostrar, setModalRegistroMostrar] = useState(false);
  const [modalEdicionMostrar, setModalEdicionMostrar] = useState(false);
  const [modalEliminarMostrar, setModalEliminarMostrar] = useState(false);
  const [modalDetallesMostrar, setModalDetallesMostrar] = useState(false);

  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [detallesCompra, setDetallesCompra] = useState([]);

  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: "",
    fecha_compra: "",
    total_compra: 0,
  });

  const [detalles, setDetalles] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    obtenerCompras();
    obtenerEmpleados();
    obtenerProductos();
  }, []);

  async function obtenerCompras() {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/compras`);
      const data = await res.json();
      setCompras(data);
    } catch (error) {
      alert("Error al cargar las compras");
      console.error(error);
    }
    setCargando(false);
  }

  async function obtenerEmpleados() {
    try {
      const res = await fetch(`${API_URL}/empleados`);
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error cargando empleados", error);
    }
  }

  async function obtenerProductos() {
    try {
      const res = await fetch(`${API_URL}/productos`);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  }

  const abrirModalEdicion = (compra) => {
    setCompraSeleccionada(compra);
    setNuevaCompra({
      id_empleado: compra.id_empleado,
      fecha_compra: compra.fecha_compra.split("T")[0],
      total_compra: compra.total_compra,
    });
    setDetalles([]); // Aquí podrías cargar detalles si quieres
    setModalEdicionMostrar(true);
  };

  const abrirModalEliminacion = (compra) => {
    setCompraSeleccionada(compra);
    setModalEliminarMostrar(true);
  };

  async function obtenerDetalles(id_compra) {
    try {
      const res = await fetch(`${API_URL}/detalles_por_compra/${id_compra}`);

      if (!res.ok) {
        throw new Error(`Error al obtener detalles de la compra con id ${id_compra}`);
      }

      const data = await res.json();

      // Aseguramos que data sea un arreglo para evitar errores en el modal
      setDetallesCompra(Array.isArray(data) ? data : []);

      // Mostrar modal con los detalles
      setModalDetallesMostrar(true);

    } catch (error) {
      alert("Error cargando detalles de compra");
      console.error(error);
    }
  }

  async function agregarCompra() {
    try {
      const totalCalculado = detalles.reduce(
        (acc, det) => acc + det.cantidad * det.precio_unitario,
        0
      );
      const compraPayload = {
        ...nuevaCompra,
        total_compra: totalCalculado,
      };

      const resCompra = await fetch(`${API_URL}/registrarcompra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compraPayload),
      });

      if (!resCompra.ok) throw new Error("Error al registrar compra");

      const dataCompra = await resCompra.json();

      for (const detalle of detalles) {
        const detallePayload = {
          id_compra: dataCompra.id_compra,
          id_producto: detalle.id_producto,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
        };
        await fetch(`${API_URL}/registrardetallecompra`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detallePayload),
        });
      }

      alert("Compra registrada con éxito");
      setModalRegistroMostrar(false);
      obtenerCompras();
      setNuevaCompra({ id_empleado: "", fecha_compra: "", total_compra: 0 });
      setDetalles([]);
    } catch (error) {
      alert("Error al guardar compra");
      console.error(error);
    }
  }

  async function confirmarEliminacion() {
    try {
      const res = await fetch(
        `${API_URL}/eliminarcompra/${compraSeleccionada.id_compra}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar compra");
      alert("Compra eliminada");
      setModalEliminarMostrar(false);
      obtenerCompras();
    } catch (error) {
      alert("Error al eliminar compra");
      console.error(error);
    }
  }

  return (
    <>
      <h2>Gestión de Compras</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setModalRegistroMostrar(true)}
      >
        Nueva Compra
      </button>

      <TablaCompras
        compras={compras}
        cargando={cargando}
        obtenerDetalles={obtenerDetalles}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
      />

      <ModalRegistroCompra
        mostrar={modalRegistroMostrar}
        setMostrar={() => setModalRegistroMostrar(false)}
        nuevaCompra={nuevaCompra}
        setNuevaCompra={setNuevaCompra}
        detalles={detalles}
        setDetalles={setDetalles}
        empleados={empleados}
        productos={productos}
        agregarCompra={agregarCompra}
        hoy={hoy}
      />

      <ModalEdicionCompra
        mostrar={modalEdicionMostrar}
        setMostrar={() => setModalEdicionMostrar(false)}
        compra={compraSeleccionada}
        empleados={empleados}
        productos={productos}
      />

      <ModalEliminacionCompra
        mostrar={modalEliminarMostrar}
        setMostrar={() => setModalEliminarMostrar(false)}
        compra={compraSeleccionada}
        confirmarEliminacion={confirmarEliminacion}
      />

      <ModalDetallesCompras
        mostrarModal={modalDetallesMostrar}
        setMostrarModal={() => setModalDetallesMostrar(false)}
        detalles={detallesCompra}
      />
    </>
  );
};

export default Compras;
