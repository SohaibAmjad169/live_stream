import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  paymentType: String,
  role: String,
  rate: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
