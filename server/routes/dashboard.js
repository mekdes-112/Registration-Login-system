const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization')
const pool = require("../db");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user] 
    ); 
       
    res.json({
      success: true,
      data: user.rows[0]});
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
