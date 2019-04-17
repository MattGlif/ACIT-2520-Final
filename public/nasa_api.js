const axios = require('axios');
const _ = require('lodash');
const nasa_key = 'IrLWAsam5NjXMSuczqAFuQTPmhjpviYBoOUMIBlj'

var get_pictures = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pics = await axios.get(`https://images-api.nasa.gov/search?q=${query}`);
            let nasa_pic = [];
            let picture = pictures.data.collections.items[0].links[0].href;

            for (pic in pictures.data.collection.items){
                if (picture.substring(0, 36) === 'https://images-assets.nasa.gov/image')
                nasa_pic.push(picture);
            }
            resolve(nasa_pic)
        } catch (err) {
            reject (err)
        }
    })
};

module.exports = {
    get_pictures
};