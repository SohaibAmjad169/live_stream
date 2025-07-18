import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['commission', 'hourly'], required: true },
  rate: Number,
  approvedSales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
  hoursWorked: Number, 
  totalPay: Number
}, { timestamps: true });

export default mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
