// import express from 'express';
// const axios = require('axios');

// const spaceFlightRouter = express.Router();
// const URL_SPACE_FLIGHT = 'https://api.spaceflightnewsapi.net/v3/articles';
// const CANT_MAX_ARTICLES = 5;

// spaceFlightRouter.get('/', (req, res) => {
//    getFiveFinalArticles(res);
// });

// async function getFiveFinalArticles(res) {
//     try {
//         const response = await axios.get(URL_SPACE_FLIGHT);
//         console.log(response.data);
//         const jsArrayData =[];
//         let detail;
//         let code;
//         let cantArticles = 0;
//         if(Array.isArray(response.data)){
//             detail ="Articles found.";
//             code = 200;
//             response.data.reverse().forEach((element) => {
//                 if(cantArticles < CANT_MAX_ARTICLES){
//                     jsArrayData.push(element);
//                     cantArticles++;
//                 }
//               });
//         }else{
//             detail = "Articles not found.";
//             code = 100;
//         }
//         res.send({
//             "response": detail,
//             "code": code,
//             "data": jsArrayData
//         })
//       } catch (error) {
//         console.error(error);
//         res.send({
//             "response": "Error on process Articles.",
//             "code": 500,
//             "data": []
//         })
//       }
// }

// module.exports = spaceFlightRouter;