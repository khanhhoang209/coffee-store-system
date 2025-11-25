import mongoose from 'mongoose'
import ORDER_STATUS from '../constants/orders.constant'

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    payAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('Order', OrderSchema)
