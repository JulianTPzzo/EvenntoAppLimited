const { response } = require("express");
const Post = require("../models/Post");

const getPosts = async (req, res = response) => {

  const posteos = await Post.find() //Aca se aplicaran los filtros para traer los posteos de las personas que se sigan - Clase 397 aprox
                            .populate('user', 'name username'); // Agrego la info que quiero traer de user

  res.json({
    ok: true,
    posteos,
  });

};

const createPost = async (req, res = response) => {
  const post = new Post(req.body);

  try {

    post.user = req.uid;

    const postGuardado = await post.save();

    res.json ({
        ok: true,
        post: postGuardado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }

};

const deletePost = async (req, res = response) => {
 
    const postID = req.params.id;
    const uid = req.uid; // id de usuario actual
  
    try {
      
      const post = await Post.findById( postID );
  
      if ( !post ) {
        return res.status(404).json({
          ok: false,
          msg: "post no existe por ese ID",
        });
      }
  
      if ( post.user.toString() !== uid ) {
        return res.status(401).json({
          ok:false,
          msg: 'No tiene privilegios para eliminar este post'
        });
      }
  
      await Post.findByIdAndDelete( postID );
  
      res.json({ ok: true });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Por favor hable con el administrador",
      });
  
    }
  
  };

// const updatePost = async (req, res = response) => {

//   const postID = req.params.id;
//   const uid = req.uid; // id de usuario actual

//   try {
    
//     const post = await Post.findById( postID );

//     if ( !post ) {
//       return res.status(404).json({
//         ok: false,
//         msg: "Post no existe por ese ID",
//       });
//     }

//     if ( post.user.toString() !== uid ) {
//       return res.status(401).json({
//         ok:false,
//         msg: 'No tiene privilegios para editar este post'
//       });
//     }

//     const nuevoPost = {
//       ...req.body,
//       user: uid
//     }

//     const postActualizado = await Post.findByIdAndUpdate( postID, nuevoPost, { new: true } ); 

//     res.json({
//       ok: true,
//       post: postActualizado
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Por favor hable con el administrador",
//     });

//   }

  
// };

module.exports = {
  getPosts,
  createPost,
  // updatePost,
  deletePost,
};
