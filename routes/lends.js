const Lends = require("../models/Lends");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const { router } = express.Router;

router.post("/lends", verifyTokenAndAdmin, async (req, res) => {
  const newLends = new Lends(req.body);

  try {
    const savedLends = await newLends.save();
    res.status(200).json(savedLends);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*router.update("/update/lends", verifyTokenAndAdmin, async (req, res) => {
  
});*/

router.get("/lends", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  {
    /*try {
    const Total_lends = await Lends.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          lends: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$lends" },
        },
      },
    ]);
    res.status(200).json(Total_lends);
  } catch (err) {
    res.status(500).json(err);
  }*/
  }
});

/*router.get('/stats', (req, res)=>{
})*/

module.exports = router;
