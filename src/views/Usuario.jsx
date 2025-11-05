import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaUsuarios from "../components/usuario/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroUsuario from "../components/usuario/ModalRegistroUsuario";
import ModalEliminacionUsuario from "../components/usuario/ModalEliminacionUsuario";
import ModalEdicionUsuario from "../components/usuario/ModalEdicionUsuario";

const Usuarios = () => {
  const [usuarios, setusuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contraseña: "",
  });

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [usuarioEditada, setUsuarioEditada] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

 const abrirModalEdicion = (usuario) => {
    setUsuarioEditada({ ...usuario });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!usuarioEditada.usuario.trim()) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3002/api/actualizarusuariopatch/${usuarioEditada.id_usuario}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(usuarioEditada),
        }
      );

      if (!respuesta.ok) throw new Error('Error al actualizar');

      setMostrarModalEdicion(false);
      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("No se pudo actualizar la usuario.");
    }
  };

    const abrirModalEliminacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarusuario/${usuarioAEliminar.id_usuario}`,
        {
          method: 'DELETE',
        }
      );

      if (!respuesta.ok) throw new Error('Error al eliminar');

      setMostrarModalEliminar(false);
      setUsuarioAEliminar(null);
      await obteneUsuariosategorias();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar la usuario.");
    }
  };



  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.usuario.trim()) return;
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarusuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoUsuario),
        }
      );
      if (!respuesta.ok) throw new Error("Error al guardar");
      // Limpiar y cerrar
      setNuevoUsuario({ usuario: "", contraseña: "" });
      setMostrarModal(false);
      await obtenerUsuarios(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo guardar el usuario. Revisa la consola.");
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/usuarios");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const datos = await respuesta.json();
      setusuarios(datos);
      setUsuariosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contraseña.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  return (
    <>
      <Container className="mt-4">
        <h4>Usuarios</h4>
        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
          <Col className="text-end">
            <Button
              className="color-boton-registro"
              onClick={() => setMostrarModal(true)}
            >
              + Nuevo Usuario
            </Button>
          </Col>
        </Row>
         <TablaUsuarios
          usuarios={usuariosFiltrados}
          cargando={cargando}
          abrirModalEdicion={abrirModalEdicion}
          abrirModalEliminacion={abrirModalEliminacion}
        />
        <ModalRegistroUsuario
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
        />

         <ModalEdicionUsuario
          mostrar={mostrarModalEdicion}
          setMostrar={setMostrarModalEdicion}
          usuarioEditada={usuarioEditada}
          setUsuarioEditada={setUsuarioEditada}
          guardarEdicion={guardarEdicion}
        />

        <ModalEliminacionUsuario
          mostrar={mostrarModalEliminar}
          setMostrar={setMostrarModalEliminar}
          usuario={usuarioAEliminar}
          confirmarEliminacion={confirmarEliminacion}
        />
      </Container>
    </>
  );
};
export default Usuarios;