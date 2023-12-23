// Creacion de tabla de Posts

const { Schema, model } = require("mongoose");

const PostSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    post_type: {
        type: String,
        required: true
    },
    likes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Usuario" 
    }],
    participations: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Usuario" 
    }],
    sad_reactions: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Usuario" 
    }],
    angry_reactions: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Usuario" 
    }],
    original_post_id: { 
        type: Schema.Types.ObjectId, 
        ref: "Post" 
    },
    media_attachments: [{
        media_type: String,
        url: String,
    }],
    poll: {
        question: String,
        options: [String],
        op1: Number,
        op2: Number,
        op3: Number,
        op4: Number,
    },
    date: {
        type: Date,
        required: true
    },

});

PostSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Post", PostSchema);
