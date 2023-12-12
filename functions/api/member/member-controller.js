const express = require('express');
const router = express.Router();

router.get('/check-duplicate-id', (req, res) => {
    const checkId = req.query.id;
    if (!checkId || checkId === "") {
        return res.status(400).send('Missing required parameters.');
    }
    res.send('{"returnCode":"0000", "returnMessage":"사용 가능한 아이디입니다."}');
});

// Export the router
module.exports.memberController = router;