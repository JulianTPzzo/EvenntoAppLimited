const { response } = require("express");
const Usuario = require("../models/Usuario");
const Fuse = require("fuse.js");

const getUser = async (req, res = response) => {
  const { username } = req.params;

  try {
    const allUsers = await Usuario.find().select('username name links followers following');

    // Configuración de Fuse
    const fuseOptions = {
      keys: ['username'], // Campos para la búsqueda
      threshold: 0.3, // Umbral de similitud
    };

    const fuse = new Fuse(allUsers, fuseOptions);
    const searchResults = fuse.search(username);

    if (searchResults.length === 0) {
      
      return res.status(404).json({
        ok: false,
        msg: "No se encontró ningún usuario con ese nombre ni usuarios similares.",
      });
    }

    const similarUsers = searchResults.map(result => result.item);

    res.json({
      ok: true,
      similarUsers,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = {
  getUser,
};

