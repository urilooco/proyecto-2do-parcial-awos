const express = require("express");
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

// es para poner un la ruta "/usuario" en la URL de Postman
app.get("/usuario", function (req, res) {
  let desde = req.query.desde || 0;
  let hasta = req.query.hasta || 5;

  Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: 'Ocurrió un error al momento de consultar',
          err
        });
      }

      res.json({
        ok: true,
        msg: 'Lista de usuarios obtenida con éxito',
        conteo: usuarios.length,
        usuarios
      });
    });
});

app.post("/usuario", function (req, res) {
  let body = req.body;
  let usr = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  });

  usr.save((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrió un error',
        err
      });
    }

    res.json({
      ok: true,
      msg: 'Usuario insertado con éxito',
      usrDB
    });
  });

  // if (nombre === undefined) {
  //   res.status(400).json({
  //     ok: 400,
  //     mensaje: "Favor de enviar el valor del nombre",
  //   });
  // } else {
  //   res.json({
  //     ok: 200,
  //     mensaje: "Usuario insertado con éxito",
  //     body: body,
  //   });
  // }
});

app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email']);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrió un error al momento de actualizar',
        err
      });
    }

    res.json({
      ok: true,
      msg: 'Usuario actualizado con éxito',
      usuario: usrDB
    })
  });
});

app.delete("/usuario/:id", function (req, res) {
  // let id = req.params.id;

  // Usuario.deleteOne({ _id: id }, (err, usuarioBorrado) =>{
  //   if(err){
  //     return res.status(400).json({
  //       ok: false,
  //       msg: 'Ocurrió un error al momento de eliminar',
  //       err
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     msg: 'Usuario eliminado con éxito',
  //     usuarioBorrado
  //   });
  // });
  let id = req.params.id;

  Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrió un error al momento de eliminar',
        err
      });
    }

    res.json({
      ok: true,
      msg: 'Usuario eliminado con éxito',
      usrDB
    });
  })
});

module.exports = app;
