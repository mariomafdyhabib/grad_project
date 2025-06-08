import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    enum: ['أسبوع', 'أسبوعين', 'شهر', 'شهرين', 'ثلاثة اشهر', 'أكثر من 6 أشهر'],
  },
  category: {
    type: String,
    required: true,
    enum: [
      'محبوك',
      'نجارة',
      'تطريز',
      'سباكة',
      'صناعة المنسوجات',
      'لحام',
      'إكسسوارات',
      'خزف',
      'أعمال النسيج',
      'نقاشة',
      'أرضيات وسيراميك',
    ],
  },
  budget: {
    type: Number,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
