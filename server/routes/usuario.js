const express = require("express");
const app = express();

// es para poner un la ruta "/usuario" en la URL de Postman
app.get("/usuario", function (req, res) {
  res.json({
    ok: 200,
    mensaje: "Usuario consultados con éxito",
  });
});

app.post("/usuario", function (req, res) {
  let nombre = req.body.nombre;
  let body = req.body;

  if (nombre === undefined) {
    res.status(400).json({
      ok: 400,
      mensaje: "Favor de enviar el valor del nombre",
    });
  } else {
    res.json({
      ok: 200,
      mensaje: "Usuario insertado con éxito",
      body: body,
    });
  }
});

app.put("/usuario/:id/:nombre", function (req, res) {
  let id = req.params.id;
  let nombre = req.params.nombre;
  res.json({
    ok: 200,
    mensaje: "Usuario actualizado con éxito",
    id: id,
    nombre: nombre,
  });
});

app.delete("/usuario/:id", function (req, res) {
  let id = req.params.id;

  res.json({
    ok: 200,
    mensaje: "Usuario eliminado con éxito",
    id: id,
  });
});

module.exports = app;
