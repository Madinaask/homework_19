import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    birthYear: {
      type: Number,
    },
    country: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Author', authorSchema)
