const { response } = require("express");
const Evento = require("../models/Evento");

const getEvents = async (req, res = response) => {

  const eventos = await Evento.find() //Aca se aplicaran los filtros para traer los eventos de las personas que se sigan
                              .populate('user', 'name username'); // Agrego la info que quiero traer de user

  res.json({
    ok: true,
    eventos,
  });
};

const createEvent = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {

    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json ({
        ok: true,
        evento: eventoGuardado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

};

const updateEvent = async (req, res = response) => {

  const eventoID = req.params.id;
  const uid = req.uid; // id de usuario actual

  try {
    
    const evento = await Evento.findById( eventoID );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok:false,
        msg: 'No tiene privilegios para editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoID, nuevoEvento, { new: true } ); 

    res.json({
      ok: true,
      evento: eventoActualizado
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });

  }

  
};

const deleteEvent = async (req, res = response) => {
 
  const eventoID = req.params.id;
  const uid = req.uid; // id de usuario actual

  try {
    
    const evento = await Evento.findById( eventoID );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese ID",
      });
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok:false,
        msg: 'No tiene privilegios para eliminar este evento'
      });
    }

    await Evento.findByIdAndDelete( eventoID );

    res.json({ ok: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });

  }

};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
