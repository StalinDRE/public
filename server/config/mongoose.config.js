const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1/Brigadistas_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("La conexion con la base de datos se establecio correctamente"))
  .catch((err) => console.log("Algo salio mal", err));
