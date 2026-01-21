const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

userID:{

type:mongoose.Schema.Types.ObjectId,
ref:'user'

},


product:[{


    productType:{

        type:String,
        require:true

    },
    isEdible:{

        type:Boolean,
        require:true

    }
    ,
    flavor:{

        type:String

    }


}],
price:{

    type:Number,
    require:true

},
brand:{

    type:String,
    require:true

},
remainingStock:{

    type:Number,
    require:true

}
}, { timestamps: true })

module.exports = mongoose.model('stock',stockSchema)

