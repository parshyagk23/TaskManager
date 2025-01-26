const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    dueDate: {
      type: Date,
      require: true,
    },
    TaskId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: [
      {
        email: {
          type: String,
          ref: "User",
          required: true,
        },
        submittedDetails: {
          type: String,
          default: "",
        },
        submittedAt: {
          type: Date,
          default: "",

        },
        status: {
          type: String,
          default: "Pending",
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'UpdatedAt' } }
)

module.exports = mongoose.model("Task", taskSchema);

