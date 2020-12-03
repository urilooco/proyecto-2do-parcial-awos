const express = require("express");
const _ = require('underscore');
const app = express();
const Producto = require('../models/productos');

app.get('/producto', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Producto.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            msg: 'Ocurrió un error al momento de consultar',
            err
          });
        }
  
        res.json({
          ok: true,
          msg: 'Lista de productos obtenida con éxito',
          conteo: productos.length,
          productos
        });
    });
});

app.post('/producto', (req, res) => {
    let pro = new Producto({
        nombre: req.body.nombre,
        precioUni : req.body.precioUni,
        categoria : req.body.categoria,
        usuario : req.body.usuario
    });

    pro.save((err, proDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con éxito',
            proDB
        });
    });
});

app.put("/producto/:id", function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria', 'usuario']);
  
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: 'Ocurrió un error al momento de actualizar',
          err
        });
      }
  
      res.json({
        ok: true,
        msg: 'Producto actualizado con éxito',
        producto: proDB
      })
    });
});

app.delete("/producto/:id", function (req, res) {
    let id = req.params.id;
  
    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          msg: 'Ocurrió un error al momento de eliminar',
          err
        });
      }
  
      res.json({
        ok: true,
        msg: 'Producto eliminado con éxito',
        proDB
      });
    })
  });

module.exports = app;