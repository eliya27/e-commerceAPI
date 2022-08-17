const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true }, //Either Monthly ex:rent OR Daily ex:lunch, bus fee etc
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", ExpensesSchema);
