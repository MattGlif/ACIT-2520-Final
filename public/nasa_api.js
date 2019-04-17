const axios = require('axios');
const _ = require('lodash');
const nasa_key = 'IrLWAsam5NjXMSuczqAFuQTPmhjpviYBoOUMIBlj'

// var get_pictures = (query) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const pics = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
//             let nasa_pic = [];

//             for (pic in pictures.data.collection.items){
//                 picture = pictures.data.collections.items[0].links[0].href;
//                 if (picture.substring(0, 36) === 'https://images-assets.nasa.gov/image')
//                 nasa_pic.push(picture);
//             }
//             resolve(nasa_pic)
//         } catch (e) {
//             reject (e)
//         }
//     })
// };
// var get_pictures = (query) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const pics = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
//             let nasa_pic = [];
//             for (pic in pictures.data.collection.items){
//                 e = pics.data.collection.items[pic].links[0].href;
//                 // console.log(e.substring(0,36));
//                 if (e.substring(0,36) === 'https://images-assets.nasa.gov/image')
//                     nasa_pic.push(e);
//             }
//             resolve(nasa_pic)
//         } catch (e) {

//             reject(e);
//         }
//     })
// };

var get_pictures = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            let output = [];
            const pictures = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
            for (i in pictures.data.collection.items){
                pic = pictures.data.collection.items[i].links[0].href;
                // console.log(e.substring(0,36));
                if (pic.substring(0,36) === 'https://images-assets.nasa.gov/image')
                    output.push(pic);
            }
            resolve(output)
        } catch (e) {

            reject(e);
        }
    })
};


module.exports = {
    get_pictures
};