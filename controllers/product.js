import Product from "../models/product.js";


const getProductsByCategoryId = async(req, res )=>{
    const {categoryId} = req.params

    try {
        const products = await Product.find({category: categoryId})

        if (!products || products.length ===0 ){
            return res.status(404).json({
                success:false,
                message:"No Product Founds"
            })
        }

        res.status(200).json({
            success:true,
            products,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to Retrieve categories",
            error:error.message,
        });
    }
}

export {getProductsByCategoryId}