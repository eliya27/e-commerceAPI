const express = require("../models/Expenses");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = express.Router;

router.post("/myexpenses", verifyTokenAndAdmin, async (req, res) => {
  const newExpense = new Expenses(req.body);

  try {
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/myexpenses", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  {
    /*try {
    const expenses = await Expenses.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          expenses: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$expenses" },
        },
      },
    ]);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }*/
  }
});

//export default router;
