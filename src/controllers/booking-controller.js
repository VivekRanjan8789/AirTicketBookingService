const { StatusCodes } = require('http-status-codes');

const BookingService = require('../services/booking-service');

this.bookingService = new BookingService();

const create = async (req,res) => {
     try {
        const response =await this.bookingService.createBooking(req.body);
        console.log("FROM BOOKING CONTROLLER RESPONSE",response);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        });
     } catch (error) {
        console.log("FROM  BOOKING CONTROLLER ERROR", error);
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })
     }
}

module.exports = {
    create
}