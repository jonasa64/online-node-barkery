const express = require('express');
const router = express.Router();
router.get("/", (req, res) => {
    try {
        res.render('thankyou');
    }catch (error) {
        res.send("error");
    }
});

module.exports = router;
