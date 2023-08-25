// const { response } = require("express");
// const { default: Score } = require("../../src/components/Score");
const User = require("../models/user.model");

module.exports.crearUsuario = (req, res) => {
  const { Nombre, Apellido, Correo, Password, Telefono, preguntas } = req.body;
  console.log(req.body)
  User.create({
    Nombre: Nombre,
    Apellido: Apellido,
    Correo: Correo,
    Password: Password,
    Telefono: Telefono,
    preguntas: preguntas
    // preguntas:{
    //   Edad: preguntas.Edad,
    //   NombreMascota: preguntas.NombreMascota
    // }
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.obtenerTodosLosUsuarios = (req, res) => {
  User.find({})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ err: "Error al obtener el elemento" });
    });
};

module.exports.actulizarUsuario = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


