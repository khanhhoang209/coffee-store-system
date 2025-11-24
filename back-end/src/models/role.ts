import mongoose from 'mongoose'
import ROLE_NAME from '../constants/roles'

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(ROLE_NAME),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('Role', RoleSchema)
