import Razorpay from "razorpay";
import crypto from "crypto"
import Order from "../models/order.js"
import Transaction from "../models/transaction.js"

const createTransaction = async (req , res) =>{
    const {amount , userId} = req.body;

    const razorpay = new Razorpay({
        key_id:process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_SECRET,
    })

    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receipts# ${Date.now()}`
    }

    try {
        
        if(!amount || !userId){
            return res.status(400).json({
                success:false,
                message:'Amount and User Id required'
            })
        }

        const razorPayOrder = await razorpay.orders.create(options)

        res.status(201).json({
            success:true,
            message:"Order Created Successfully",
            key: process.env.RAZOR_PAY_KEY_ID,
            amount:razorPayOrder.amount,
            currency:razorPayOrder.currency,
            order_id: razorPayOrder.id
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to Retrieve categories",
            error:error.message,
        });
    }
}

const createOrder = async ()=>{
    const {

        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        deliveryDate,
        address,
    }=req.body;

    const key_secret = process.env.RAZOR_PAY_SECRET;

    const generated_signature = crypto.createHmac('sha256', key_secret)
    .update(razorpay_order_id+"|"+razorpay_payment_id)
    .digest("hex")


    if (generated_signature === razorpay_signature){
        try {
            const transaction  = await Transaction.create({
                user:userId,
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status:'Success',
                amount: cartItems.reduce(
                    (total,item)=>total + item?.quantity * item.price,
                    0
                )
            })


            const order = await Order.create({
                user: userId,
                address,
                deliveryDate,
                items: cartItems?.map((item)=>({
                    product:item?._id,
                    quantity:item?.quantity,
                })),

                status:"Order Placed"
            })

            transaction.order = order._id;
            await transaction.save();
            res.json({
                success:true,
                message:'Payment Verified and Order Created',
                order,
            })

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Failed to Retrieve categories",
                error:error.message,
            });
        }
    }
}

const getOrderByUserId = async (req, res)=>{
    const {userId} = req.params;

    try {
        const orders = await Order.find({
            user:userId
        })
        .populate("user", "name email")
        .populate("item.product", "name price image_uri ar_uri")

        .sort({createdAt: -1})

        if(!orders || orders.length === 0){
            return res.status(404).json({
                success:true,
                message:"No Orders found for this user",
            })
        }

        res.status(200).json({
            success:true,
            orders,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to Retrieve categories",
            error:error.message,
        });
    }
}


export {createTransaction, createOrder, getOrderByUserId}