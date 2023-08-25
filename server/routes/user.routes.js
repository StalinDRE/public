const UserController = require('../controllers/user.controllers');

module.exports = function(app) {
    app
    .post("/brigadista/new", UserController.crearUsuario)
    .get("/brigadistas", UserController.obtenerTodosLosUsuarios)
    .put("/brigadista/mod/:id", UserController.actulizarUsuario)
}