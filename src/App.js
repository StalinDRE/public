import "./App.css";
import Menuizquierdo from "./components/menuizquierdo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import AñadirUsuarios from "./components/AñadirUsuarios";
import ReestablecerContraseña from "./components/ReestablecerContraseña";
import axios from "axios";

const IP_ADDRESS = "localhost";

// const datosLista = [
//   {
//     user: "Stalin",
//     apellido: "Ramirez",
//     correo: "stalin.ramirez@epn.edu.ec",
//     pass: 12345,
//     telef: 1123456789,
//   },
//   {
//     user: "Estalin",
//     apellido: "Ramirez",
//     correo: "stalin.ramirez@epn.edu.ec",
//     pass: 67891,
//     telef: 1123456789,
//   },
//   {
//     user: "Mateo",
//     apellido: "Ramirez",
//     correo: "stalin.ramirez@epn.edu.ec",
//     pass: 23456,
//     telef: 1123456789,
//   },
// ];

function App() {
  function getList() {
    axios
      .get(`http://${IP_ADDRESS}:8000/brigadistas`)
      .then((response) => {
        console.log("recuperado" + response.data);
        setListaUsers(response.data)
      })
      .catch(console.log);
  }
  useEffect(() => {
    getList();
  }, []);

  const [listaUsers, setListaUsers] = useState();
  console.log("Hola mijin",listaUsers);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login parametro={listaUsers} />} />
          <Route
            path="/login/newUser"
            element={<AñadirUsuarios lista={listaUsers} />}
          />
          <Route
            path="/login/updatePass"
            element={
              <ReestablecerContraseña
                listaUsuarios={listaUsers}
                setListaUsuarios={setListaUsers}
              />
            }
          />
          <Route path="/menubrigadista/:user" element={<Menuizquierdo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
