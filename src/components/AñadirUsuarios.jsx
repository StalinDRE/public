import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IP_ADDRESS = "localhost";

function AñadirUsuarios(props) {
  let navegar = useNavigate();

  const { lista } = props;

  // camino A
  const [usuario, setUsuario] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Password: "",
    Telefono: "",
    preguntas: { Edad: "", NombreMascota: "" },
  });

  // camino B
  // const [id, setID] = useState("");
  // const [user, setUser] = useState("");
  // const [apellido, setApellido] = useState("");
  // const [correo, setCorreo] = useState("");
  // const [pass, setPass] = useState("");
  // const [telef, setTelef] = useState("");

  const [repetirPass, setRepetirPass] = useState("");

  function agregarUsuario() {
    // comprobar password
    // camino A

    if (usuario.Password !== repetirPass.Password) {
      alert("tus contraseñas no coinciden");
      console.log(lista);
      return;
    }
    // camnino B
    // if (pass!==repetirPass) {
    //     alert("tus contraseñas no coinciden")
    //     return;
    // }

    // camnio A
    if (lista.find((usr) => usr.Nombre === usuario.Nombre) === undefined) {
      lista.push(usuario);
      navegar("/");
      console.log(lista);
    } else {
      alert("nombre de usuario ya existe!!!!");
      return;
    }

    axios
      .post(`http://${IP_ADDRESS}:8000/brigadista/new`, {
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Correo: usuario.Correo,
        Password: usuario.Password,
        Telefono: usuario.Telefono,
        preguntas: { Edad: usuario.preguntas.Edad, NombreMascota: usuario.preguntas.NombreMascota },
      })
      .then(console.log)
      .catch(console.log);

    // camino B
    // if (lista.find(usr => usr.user===user)===undefined)
    //     alert("nombre de usuario ya existe!!!!");
    // else
    //     lista.push({user,apellido,correo,pass,telef});
  }
  return (
    <div className="todo">
      <img className="buho3" src={require("../buho.png")} alt="img/buho" />
      <button
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

      <h1>Registro de Usuarios</h1>
      <form>
        <div className="form-group">
          <label htmlFor="nombre">
            <strong>Nombre:</strong>
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese su nombre"
            required
            onChange={(e) => setUsuario({ ...usuario, Nombre: e.target.value })}
          />{" "}
          {/*camino A*/}
          {/* onChange={(e) => setNombre(e.target.value)}/> */} {/*camino B*/}
        </div>
        <div className="form-group">
          <label htmlFor="apellido">
            <strong>Apellido:</strong>
          </label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese su apellido"
            required
            onChange={(e) =>
              setUsuario({ ...usuario, Apellido: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <strong>Correo Electrónico:</strong>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
            onChange={(e) => setUsuario({ ...usuario, Correo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>Contraseña:</strong>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            required
            onChange={(e) =>
              setUsuario({ ...usuario, Password: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">
            <strong>Repetir Contraseña:</strong>
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Repita su contraseña"
            required
            onChange={(e) =>
              setRepetirPass({ ...usuario, Password: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            <strong>Número de Celular:</strong>
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Ingrese su número de celular"
            required
            onChange={(e) =>
              setUsuario({ ...usuario, Telefono: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="edad">
            <strong>Edad:</strong>
          </label>
          <input
            type="number"
            id="edad"
            placeholder="Ingrese su edad"
            value={usuario.preguntas.Edad}
            onChange={(e) => setUsuario({ ...usuario, preguntas:{...usuario.preguntas, Edad: e.target.value} })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombreMascota">
            <strong>Nombre de Mascota:</strong>
          </label>
          <input
            type="text"
            id="nombreMascota"
            placeholder="Ingrese el Nombre de su Mascota"
            value={usuario.preguntas.NombreMascota}
            onChange={(e) =>
              setUsuario({ ...usuario, preguntas:{...usuario.preguntas,NombreMascota: e.target.value} })
            }
          />
        </div>

        <button type="submit" onClick={agregarUsuario}>
          Registrar
        </button>
      </form>
    </div>
  );
}

export default AñadirUsuarios;
