import { Request, Response } from 'express';
import { Appointment } from './appointment.entity.js';
import { AppointmentMongoRepository } from './appointment.mongodb.repository.js';
import { AppointmentPostgresRepository } from './appointment.postgres.repository';

export class AppointmentController {
    constructor(private repo: AppointmentPostgresRepository) {}

    async findAllAppointments(req: Request, res: Response) {
        const appointments = await this.repo.findAll();
        res.json(appointments);
    }

    async findAppointmentById(req: Request, res: Response) {
        const appointmentId = req.params.id;
        const appointment = await this.repo.findOne(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                errorMessage: 'Appointment not found',
                errorCode: 'APPOINTMENT_NOT_FOUND',
            });
        }
        res.json({ data: appointment });
    }

    async addAppointment(req: Request, res: Response) {
        const input = req.body.sanitizedInput;

        const newAppointment = {
            date: input.date,
            time: input.time,
            custumer_name: input.custumer_name,
            custumer_email: input.custumer_email,
            booked_service: input.booked_service,
            status: input.status || 'scheduled',
        };

        const result = await this.repo.create(newAppointment);
        res.status(201).json({ data: result });
    }

    async updateAppointment(req: Request, res: Response) {
        // Implementar si querés
        res.status(501).json({ message: "Not implemented" });
    }

    async deleteAppointment(req: Request, res: Response) {
        const appointmentId = req.params.id;
        await this.repo.delete(appointmentId);
        res.status(200).json({
            message: "Appointment deleted successfully"
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { custumer_name, booked_service, date, time, custumer_email, status } = req.body;

        const available = await this.repo.isAvailable(booked_service, date);
        if (!available) {
            return res.status(400).json({ message: 'Turno no disponible' });
        }

        const appointment = await this.repo.create({
            custumer_name,
            booked_service,
            date,
            time,
            custumer_email,
            status: status || 'scheduled'
        });

        return res.status(201).json({
            message: 'Turno reservado con éxito',
            appointment,
        });
    };
}
