const express = require("express");
const router = express.Router();

const Group = require("./group.model");

// 🔥 CHECK GROUP CODE
router.post("/check", async (req, res) => {
  try {
    const { code } = req.body;

    const group = await Group.findOne({ code });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    return res.json({
      success: true,
      message: "Group exists",
      data: group,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
