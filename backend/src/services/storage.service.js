const imageKit = require("imagekit")

const storageInstance = new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATEKEY,
    publicKey:process.env.IMAGEKIT_PUBLICKEY,
    urlEndpoint:process.env.IMAGEKIT_URLENDPOINT,
});

const sendFilesToStorage = async (file,fileName)=>{
    return await storageInstance.upload({
        file,
        fileName,
        folder:"Flipkart",
    });
};

module.exports = sendFilesToStorage;