const mongoose = require("mongoose")


const prodectSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type: String,
            required: true
        },
        price:{
            amount:{
                type:Number,
                require:true
            },
            currency:{
                type: String,
                enun: ["INR","DOLLAR"],
                default:"INR",
            },
        },
        image:{
            type:[],
            required: true,
        },
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
    },
    {timestamps:true}
);

const ProdectModel = mongoose.model("prodect",prodectSchema)

module.exports = ProdectModel;