import express from 'express';
import { custumerRouter } from './custumer/custumer.routes.js';
import { appointmentRouter } from './appointment/appointment.routes.js';
const app = express();
app.use(express.json());
app.use('/api/custumers', custumerRouter);
app.use('/api/appointments', appointmentRouter);
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map