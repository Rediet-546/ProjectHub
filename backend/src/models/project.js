import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed'],
    default: 'Planning',
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Project', ProjectSchema);