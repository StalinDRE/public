import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IP_ADDRESS = "localhost";

function ReestablecerContraseña({ listaUsuarios, setListaUsuarios }) {
  let navegar = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState(false);
  const [edad, setEdad] = useState("");
  const [mascota, setMascota] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const limpiarCampos = () => {
    setUsuario("");
    setNuevaContraseña("");
    setConfirmarContraseña("");
  };

  const handleRestablecerContraseña = (e) => {
    e.preventDefault();

    // Verificar si el usuario existe en la lista de usuarios`
    const usuarioExistente = listaUsuarios.find(
      (usr) => usr.Nombre === usuario
    );
    console.log("usernew", usuarioExistente);
    if (usuarioExistente) {
      console.log("base de datos", typeof usuarioExistente.preguntas.Edad);
      console.log("Formulario", typeof edad);
      if (
        parseInt(edad) === usuarioExistente.preguntas.Edad &&
        mascota === usuarioExistente.preguntas.NombreMascota
      ) {
        if (nuevaContraseña === confirmarContraseña) {
          axios
            .put(
              `http://${IP_ADDRESS}:8000/brigadista/mod/${usuarioExistente._id}`,
              {
                Password: nuevaContraseña,
              }
            )
            .then(console.log)
            .catch(console.log);
          // Actualizar la contraseña del usuario
          const usuariosActualizados = listaUsuarios.map((usr) => {
            if (usr.Nombre === usuario) {
              return { ...usr, Password: nuevaContraseña };
            }
            return usr;
          });

          setListaUsuarios(usuariosActualizados);
          alert("Contraseña restablecida exitosamente");
          limpiarCampos();
          navegar("/");
        } else {
          limpiarCampos();
          alert("Las contraseñas no coinciden");
        }
      } else {
        setRespuestasIncorrectas(true);
      }
    } else {
      limpiarCampos();
      alert("Usuario no encontrado");
      return;
    }
  };

  return (
    <div className="todo">
      <div>
        <button
          id="fle"
          onClick={() => {
            navegar("/");
          }}
        >
          <img
            className="buho"
            src={require("../flecha.png")}
            alt="img/brigadistas"
            width={30}
          />
        </button>
      </div>
      <img className="buho4" src={require("../buho.png")} alt="img/buho" />
      <h1>Reestablecer Contraseña</h1>
      <form onSubmit={handleRestablecerContraseña}>
        <div className="form-group">
          <label htmlFor="usuario">
            <strong>Usuario:</strong>
          </label>
          <input
            type="text"
            id="usuario"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Edad">
            <strong>Edad:</strong>
          </label>
          <input
            type="number"
            id="edad"
            placeholder="Ingrese su edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreMascota">
            <strong>Nombre de tu mascota:</strong>
          </label>
          <input
            type="text"
            id="mascota"
            placeholder="Ingrese el nombre de su Mascota"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nueva-contraseña">
            <strong>Nueva Contraseña:</strong>
          </label>
          <input
            type="password"
            id="nueva-contraseña"
            placeholder="Ingrese su nueva contraseña"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmar-contraseña">
            <strong>Confirmar Contraseña:</strong>
          </label>
          <input
            type="password"
            id="confirmar-contraseña"
            placeholder="Confirme su nueva contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
          />
        </div>
        <button className="btn_res" type="submit">Restablecer</button>
        {respuestasIncorrectas && (
          <div>
            <div class="alert alert-danger">
              {" "}
              Las Respuestas Ingresadas Son Incorrectas
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ReestablecerContraseña;
