//const axios = require('axios');
const ApiResponse = require('../response/ApiResponse');
const express = require('express');
const router = express.Router();

router.get('/check-duplicate-id',  (req, res) => {
    const checkId = req.query.id;

    if (!checkId || checkId === "") {
        res.json(new ApiResponse(
            "1000",
            "파라미터가 없습니다."
        ))
    }
    if (checkId === "karorok") {
        res.json(new ApiResponse(
            "8400",
            "이미 사용중인 아이디입니다."
        ))
    } else {
        res.json(new ApiResponse(
            "0000",
            "사용 가능한 아이디입니다."
        ))
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

        res.json(new ApiResponse(
            "1000",
            "파라미터가 없습니다."
        ))
    }
    if (checkEmail === "karorok@gmail.com") {
        res.json(new ApiResponse(
            "8401",
            "이미 가입한 이메일입니다."
        ))
    } else {
        res.json(new ApiResponse(
            "0000",
            "사용 가능한 이메일입니다."
        ))
    }
});


router.get('/check-duplicate-nickname',  (req, res) => {
    const checkNickName = req.query.nickName;

    if (!checkNickName || checkNickName === "") {
        res.json(new ApiResponse(
            "1000",
            "파라미터가 없습니다."
        ))
    }
    if (checkNickName === "쿠쿠루삥") {
        res.json(new ApiResponse(
            "8401",
            "이미 사용중인 닉네임입니다."
        ))
    } else {
        res.json(new ApiResponse(
            "0000",
            "사용 가능한 닉네임입니다."
        ))
    }
});



// Export the router
module.exports.memberController = router;