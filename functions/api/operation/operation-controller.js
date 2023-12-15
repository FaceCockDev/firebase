//const axios = require('axios');
const admin = require('firebase-admin');
const express = require('express');
const logger = require("firebase-functions/logger");
const ApiResponse = require('../response/ApiResponse');
const router = express.Router();
admin.initializeApp();
const db = admin.firestore();

router.get('/state/state-list',  async (req, res) => {
    try {
        const statesCollectionRef = db.collection('states');

        const querySnapshot = await statesCollectionRef.get();

        const statesData = [];
        querySnapshot.forEach((doc) => {
            const state = doc.data();
            statesData.push({
                id: doc.id,
                name: state.name
            });
        });
        const stateResponse = new ApiResponse(
            "0000",
            "",
            statesData
        );
        res.json(stateResponse);
    } catch (error) {
        logger.error('Error  : ${error}');
        res.json(new ApiResponse(
            "9000",
            "오류가 발생하였습니다."
        ));
    }
});


router.get('/state/city-list/:stateId',  async (req, res) => {

    const stateId = req.params.stateId;
    try {

        const stateDocRef = db.collection('states').doc(stateId);

        const stateDocSnapshot = await stateDocRef.get();

        if (stateDocSnapshot.exists) {
            const citiesCollectionRef = stateDocRef.collection('cities');
            const citiesQuerySnapshot = await citiesCollectionRef.get();

            const citiesData = [];
            citiesQuerySnapshot.forEach((cityDoc) => {
                const city = cityDoc.data();
                citiesData.push({
                    id: cityDoc.id,
                    name: city.name,
                });
            });
            const cityResponse = new ApiResponse(
                "0000",
                "",
                citiesData
            )
            res.json(cityResponse);
        } else {
            res.json(new ApiResponse(
                "1000",
                "존재하지 않는 시'도입니다."
            ));
        }
    } catch (error) {
        logger.error('Error  : ${error}');
        res.json(new ApiResponse(
            "9000",
            "오류가 발생하였습니다."
        ));
    }
});

// Export the router
module.exports.operationController = router;