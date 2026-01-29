const stockSchema = require('../schema/stockSchema')
const {client} = require("../config/redis")

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






await stockSchema.create({

    product,price,brand,remainingStock

})


const items = {product,price,brand,remainingStock} 
const catchKey = `stock:${brand}:${productInfo.productType}:${productInfo.flavor}`;

await client.set(catchKey, JSON.stringify(items), {
            EX: 3600 // Cache for 1 hour
        });
console.log("catchkey is ",catchKey);


res.status(201).json({message:"product created successfully and successfully catched",data:items})


    
} catch (error) {
    
    res.status(409).json("unable to create please check all the input",error)
    console.log(error);
    
}
}


const upadateStock = async (req,res)=>{

try {
const { brand } = req.params; // Cleaner destructuring    
if(!brand){

return res.status(404).json({"message":"name does not exist"})

}

    await stockSchema.findOneAndUpdate(
        {brand:brand},
{
         $set:{
    
        price:req.body.price,
        remainingStock:req.body.remainingStock
    }},
    
)
res.status(200).json({"message":"successfully updated resoources"})

} catch (error) {
    
    res.status(500).json({"message":"unable to Update check again"})
    console.log(error);
    
}



}


const putStock = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(400).json({ "message": "Product ID is required" });
        }

        // Strict PUT: Replace the whole document with req.body
        const putdata = await stockSchema.findOneAndReplace(
            { _id: _id },
            req.body,
            { new: true } // This returns the document AFTER replacement
        );

        if (!putdata) {
            // Use 'res', not 'resizeBy'! 
            // Also using the dynamic language property we'll set up next
            return res.status(404).json({ "message": req.lang?.NOT_FOUND || "Not Found" });
        }

        return res.status(200).json({
            "message": req.lang?.success || "Successfully replaced",
            "data": putdata
        });

    } catch (error) {
        console.error("Internal Error:", error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
};

const delstock = async (req,res)=>{


    try {


    const { _id } = req.params;

            if (!_id) {
                return res.status(400).json({ "message": "Product ID is required" });
            }

            // silent del: delete the whole document with req.body
            await stockSchema.findOneAndDelete(_id)
            res.status(200).json({"message":"successfully deleted"})
    } catch (error) {
        
        console.log(error);
        
    }



}



const staticGet =  async (req,res)=>{

try {
        

        const findStock = await stockSchema.find()
      

        res.format({

       'application/json': () => {
                res.status(200).json(findStock);
            },




        'text/csv':()=>{

            csvHeader = `_id,brand,price,remainign stocks,\n`
            csvRows = findStock.map(i=>{

                return `${i._id},${i.brand},${i.price},${i.remainingStock}`

            }).join('\n')

           
            res.status(200).send(csvHeader+csvRows)
            

        }


        }

        )
        

} catch (error) {
    console.log(error);
    
}



}


module.exports = {addStock,upadateStock,putStock,delstock,staticGet}