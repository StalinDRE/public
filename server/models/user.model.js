const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: [true, "Es Obligatorio ingresar un nombre"],
    unique:[true, "Este Usuario ya existe"]
  },
  Apellido: {
    type: String,
    required: [true, "Es obligatorio ingresar el apellido "],

  },
  Correo: {
    type: String,
    required: [true, "Es obligatorio ingresar el apellido "],
  },
  Password: {
    type: String,
    required: [true, "Es obligatorio ingresar un password "],
    unique: [true, `Es obligatorio ingresar un password`]
  },
  Telefono: {
    type: String,
    required: [true, "Es obligatorio ingresar un número de telefono "],
  },
  preguntas: {
    Edad: {
      type: Number,
      required: [true, "La edad es obligatoria"]
    },
    NombreMascota: {
      type: String,
      required: [true, "El nombre de la mascota es obligatorio"]
    }
  }
});

const User = mongoose.model("User", UserSchema, "brigadas");
module.exports = User;
