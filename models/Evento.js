// Creacion de tabla de eventos

const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    event_venue: {
        type: String,
        required: true
    },
    posible_participation: [{ //El usuario creador hace aviso a usuarios etiquetados
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }],
    participation: [{ //Usuarios etiquetados que aceptador y guardaron el evento en su lista para que follower vean
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }],
    reaction: {
        type: Number
    },
    state: { //Estado de evento activo, terminado , proximamente
        type: String,
    },
    privacy: { //Privacidad del evento public, private
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Evento', EventoSchema )