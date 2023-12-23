const { response } = require("express");
const Usuario = require("../models/Usuario");
const Evento = require("../models/Evento");
const Post = require("../models/Post");


const getUser = async (req, res = response) => {
    
  const { username } = req.params;

  try {

    const userFound = await Usuario.findOne({ username })
    .select("username name links followers following profile_info profile_image interests");

    if (!userFound) {
      return res.status(404).json({
        ok: false,
        msg: "Esta página no está disponible.",
      });
    }

    const fechaActual = new Date();

    const eventos = await Evento.find({
      user: userFound._id,
      start: { $gte: fechaActual }
    })
    .populate('user', 'name username');

    const posteos = await Post.find({ user: userFound._id })
                          .populate('user', 'name username');

    res.json({ user: userFound, eventos, posteos }); //

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
    
  }
};

module.exports = {
  getUser,
};
