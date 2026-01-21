const stockSchema = require('../schema/stockSchema')


const addStock = async (req,res)=>{

try {


const {product,price,brand,remainingStock} = req.body

const productInfo = product[0]



const existingStock = await stockSchema.findOne({
    "product.productType": productInfo.productType,
    "product.flavor": productInfo.flavor,
    "product.isEdible": productInfo.isEdible,
    brand: brand 
})

if(existingStock){

    return res.status(409).json({"message":`${productInfo.productType} with ${productInfo.flavor} and ${brand} alredy added`})


}


const newStock = await stockSchema.create({

    product,price,brand,remainingStock

})

res.status(201).json({message:"product created successfully",})


    
} catch (error) {
    
    res.status(409).json("unable to create please check all the input",error)
    console.log(error);
    
}
}
module.exports = addStock