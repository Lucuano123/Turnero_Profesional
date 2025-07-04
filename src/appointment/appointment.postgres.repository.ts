import { Appointment } from './appointment.entity';
import { Pool } from 'pg';

export class AppointmentPostgresRepository {
  constructor(private pool: Pool) {}

  async isAvailable(booked_service: string, date: string): Promise<boolean> {
    const res = await this.pool.query(
      'SELECT COUNT(*) FROM appointments WHERE booked_service = $1 AND date = $2',
      [booked_service, date]
    );
    return parseInt(res.rows[0].count) === 0;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const res = await this.pool.query(
      `INSERT INTO appointments 
      (custumer_name, booked_service, date, time, custumer_email, status)
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
      [
        appointment.custumer_name,
        appointment.booked_service,
        appointment.date,
        appointment.time,
        appointment.custumer_email,
        appointment.status || 'scheduled',
      ]
    );
    return res.rows[0];
  }

  async findAll(): Promise<Appointment[]> {
    const res = await this.pool.query('SELECT * FROM appointments');
    return res.rows;
  }

  async findOne(id: string): Promise<Appointment | null> {
    const res = await this.pool.query('SELECT * FROM appointments WHERE id = $1', [id]);
    return res.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM appointments WHERE id = $1', [id]);
  }
}
