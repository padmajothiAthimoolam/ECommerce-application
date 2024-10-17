import { Order } from "../models/order.model.js";
import Product from "../models/product.model.js";

export const getAnalyticsData = async() => {
    const totalUsers = await User.countDocuments();
    const totalProdcuts = await Product.countDocuments();
  
    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales : {$sum:1},
                totalRevenue: {$sum:"totalAmount"}
            }
        }
    ])

    const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0}

    return {
        users: totalUsers,
        Products: totalProdcuts,
        totalSales,
        totalRevenue
    }

}

export const getDailySalesData = async(StartDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: StartDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%T-%m-%d", date: "$createdAt"}},
                    sales: { $sum: 1 },
                    revenue: { $sum: "totalAmount"},
                },
            },
            { $sort: { _id:1 }},
        ]);
    
        const dateArray = getDatesInRange (startDate, endDate);
    
        return dateArray.map(date => {
            const foundData = dailySalesData.find(item => item._id === date);
    
            return {
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0,
            }
        })
    } catch (error) {
        throw error;
    }
}

function getDatesInRange(startDate, endDate) {
    const dates =[];
    let currentDate = new Date(startDate);

    while( currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}