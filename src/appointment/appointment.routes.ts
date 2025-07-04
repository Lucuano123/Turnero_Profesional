import { Router } from "express";
import { AppointmentController } from './appointment.controller.js';
import { AppointmentPostgresRepository } from './appointment.postgres.repository';
import { pool } from '../shared/db';

//const router = Router();
const repo = new AppointmentPostgresRepository(pool);
const controller = new AppointmentController(repo);

export const appointmentRouter = Router();

appointmentRouter.get('/', controller.findAllAppointments);
appointmentRouter.post('/', sanitizeAppointmentInput, controller.addAppointment);
appointmentRouter.put('/:id', sanitizeAppointmentInput, controller.updateAppointment);
appointmentRouter.delete('/:id', controller.deleteAppointment); 

function sanitizeAppointmentInput(req:any, res:any, next:any) {

  req.body.sanitizedInput = {
    date: req.body.date,
    time: req.body.time,
    custumer_name: req.body.custumer_name,
    custumer_email: req.body.custumer_email,
    booked_service: req.body.booked_service,
    status: req.body.status
  }


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })

  next()
}

//YO

//const controller = new AppointmentController(repo);

appointmentRouter.post('/reservar', controller.create);

export default appointmentRouter;