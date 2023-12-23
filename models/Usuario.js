// Creacion de tabla de users

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: () => new Date()
    },
    profile_info: {
      // Datos de perfil
    },
    profile_image: {
        type: Buffer, // Usar Buffer para datos binarios
        maxlength: 16 * 1024 * 1024 // Máximo 16MB
    },
    interests: [{ // La intencion es poner redes como twitch youtube para completar en los eventos en el futuro
        type: String,
    }],
    link: { // La intencion es poner redes como twitch youtube para completar en los eventos en el futuro
        type: String,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }] 
    
        // Para mayor sencillez se utilizo este metodo para seguimiento de followers, pero no es lo mas inteligente
        // Se deberia de crear una coleccion nueva para esto const followSchema = new Schema({
        // follower: { type: Schema.Types.ObjectId, ref: 'User' }, -- ID del seguidor
        // following: { type: Schema.Types.ObjectId, ref: 'User' } -- ID del usuario seguido

});

module.exports = model( 'Usuario', UsuarioSchema )