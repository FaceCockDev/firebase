//const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/check-duplicate-id',  (req, res) => {
    const checkId = req.query.id;

    if (!checkId || checkId === "") {
        res.send('{"returnCode":"1000", "returnMessage":"파라미터가 없습니다."}');
    }
    if (checkId === "karorok") {
        res.send('{"returnCode":"8400", "returnMessage":"이미 사용중인 아이디입니다."}');
    } else {
        res.send('{"returnCode":"0000", "returnMessage":"사용 가능한 아이디입니다."}');
    }


    /*
    try {
        // Make a GET request to an external API
        const apiResponse = await axios.get('http://www.facecock.co.kr/service/check_duplicate_id.php?id=${checkId}');

        // Process the response or do something with the data
        const responseData = apiResponse.data;
        // Send a response to the client
        res.status(200).send('{"returnCode":"0000", "returnMessage":"사용 가능한 아이디입니다."}');
    } catch (error) {
       // console.error('Error making API request:', error);
       // response.status(500).send('Internal Server Error');
        res.status(200).send('{"returnCode":"1000", "returnMessage":"파라미터가 없습니다."}');
    }

     */
});


router.get('/check-duplicate-email',  (req, res) => {
    const checkEmail = req.query.email;

    if (!checkEmail || checkEmail === "") {
        res.send('{"returnCode":"1000", "returnMessage":"파라미터가 없습니다."}');
    }
    if (checkEmail === "karorok@gmail.com") {
        res.send('{"returnCode":"8401", "returnMessage":"이미 가입한 이메일입니다."}');
    } else {
        res.send('{"returnCode":"0000", "returnMessage":"사용 가능한 이메일입니다."}');
    }
});



// Export the router
module.exports.memberController = router;