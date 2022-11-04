const AWS = require('aws-sdk');
const fs = require('fs')
const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


// download file from s3
const downloadFile = async (key) => {
    const params = {
        Bucket: 'luchoqq-lapstore',
        Key: key,
    };

    return s3.getObject(params)
};

// list objects in s3
function listObjects() {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
    };

    return s3.listObjectsV2(params).promise();
}


const uploadFile = (file) => {
    // Read content from the file
    const fileStream = fs.createReadStream(file.path);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename, // File name you want to save as in S3
    };

    // Uploading files to the bucket
    return s3.upload(params).promise(); 

}


// delete file from s3
function deleteFile(fileKey) {
    const deleteParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME,
    };
    return s3.deleteObject(deleteParams).promise();
}

// list all files in s3
function listFiles() {
    const listParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
    };
    return s3.listObjectsV2(listParams).promise();
}



module.exports = { uploadFile, deleteFile, downloadFile, listFiles };