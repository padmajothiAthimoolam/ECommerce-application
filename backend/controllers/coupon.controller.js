import { Coupon } from "../models/coupon.model.js";

export const getCoupon = async(req,res) => {
    try {
        const coupon = await Coupon.findOne({userId: req.user._id, isActive: true});
        res.json(coupon || null);
    } catch (error) {
        console.log("Error is getCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message})
    }
}


export const validateCoupon = async (req, res) => {
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code:code, usserId: req.user._id, isActive: true});

        if(!coupon) {
            return res.status(404).json({ message: "Coupon not found"});
        }

        if(coupon.expirationDate < new Date()) {
            isActive = false;
            coupon.save();
            return res.status(404).json( { message: "Coupon expired"});
        }

        res.json({
            message: "Coupon is valid",
            code: Coupon.code,
            discountPercentage: coupon.discountPercentage,
        });

    } catch (error) {
        console.log("Error is validateCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message})
    }

}