const { StatusCodes } = require('http-status-codes');

const BookingService = require('../services/booking-service');

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

this.bookingService = new BookingService();

class BookingController {
    constructor(){

    }

    async sendMessageToQueue(req,res) {
         const channel = await createChannel();
         const data = {message: 'success'};
         publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
         return res.status(200).json({
            message: 'successfully published the event'
         })
    }


     async create (req,res)  {
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
           });
        }
   }
}

// const create = async (req,res) => {
//      try {
//         const response =await this.bookingService.createBooking(req.body);
//         console.log("FROM BOOKING CONTROLLER RESPONSE",response);
//         return res.status(StatusCodes.OK).json({
//             message: 'Successfully completed booking',
//             success: true,
//             err: {},
//             data: response
//         });
//      } catch (error) {
//         console.log("FROM  BOOKING CONTROLLER ERROR", error);
//         return res.status(error.statusCode).json({
//             message: error.message,
//             success: false,
//             err: error.explanation,
//             data: {}
//         })
//      }
// }

module.exports = BookingController;