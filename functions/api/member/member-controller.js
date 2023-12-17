//const axios = require('axios');
const ApiResponse = require('../response/ApiResponse');
const express = require('express');
const {
    logLog,
    logInfo,
    logDebug,
    logWarn,
    logError,
    logWrite,
} = require("firebase-functions/logger");
const admin = require("firebase-admin");
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



router.post('/sign-up',  async (req, res) => {
    const requestData = req.body;

    const id = requestData.id;
    const password = requestData.password;  //base64
    const email = requestData.email;
    const priinfo = requestData.priinfo;
    const profileUrl = requestData.profileUrl; //storage
    const nickname = requestData.nickname;
    const stateId = requestData.stateId;
    const cityId = requestData.cityId;
    const fcmToken = requestData.fcmToken;

    if (!id || !password || !email || !priinfo || !profileUrl || nickname || !stateId || !cityId || !fcmToken) {
        res.json(new ApiResponse(
            "1000",
            "파라미터가 없습니다."
        ))
    }
    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
    /*
    priinfo id와 나머지 정보들 cafe24로 보내서 유저 생성 후 생성 결과 받아올 것
     */


    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            id,
        });
        const credentialToken = await admin.auth().createCustomToken(userRecord.uid);
        res.json(new ApiResponse(
            "0000",
            "",
            {
                token: credentialToken
            }
        ))
    } catch (error) {
        logError('Firebase Error  : ', error);
        res.json(new ApiResponse(
            "9000",
            ""
        ))
    }
});

router.get('/login',  async (req, res) => {

    const requestData = req.body;

    const id = requestData.id;
    const password = requestData.password;  //base64
    const fcmToken = requestData.fcmToken;

    if (!id || !password || fcmToken) {
        res.json(new ApiResponse(
            "1000",
            "파라미터가 없습니다."
        ))
    }
    const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');


    // cafe24로부터 확인,  그 이후에 메일 가져와서 user 정보 가져올 것


    //todo cafe24로부터 다 받아와서 이메일 바꿔야 함

    try {
        const user = await admin.auth().getUserByEmail("efefef@naver.com");
        const credentialToken = await admin.auth().createCustomToken(user.uid);
        res.json(new ApiResponse(
            "0000",
            "",
            {
                token: credentialToken
            }
        ))

    } catch (error) {
        logError('Firebase Error  : ', error);
        res.json(new ApiResponse(
            "9000",
            ""
        ))
    }
});

// Export the router
module.exports.memberController = router;