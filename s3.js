const AWS = require('aws-sdk');
const fs = require('fs')
const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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


// download file from s3
/* function downloadFile(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME,
    };
  
    return s3.getObject(downloadParams).createReadStream();
  }
 */

  async function downloadFile(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME,
    };

    return s3.getObject(downloadParams, (err, data) => {
        if (err) console.error(err)
        console.log(data)
        //return data.createReadStream()
    })
}


// delete file from s3
function deleteFile(fileKey) {
    const deleteParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME,
    };
    return s3.deleteObject(deleteParams).promise();
}

module.exports = { uploadFile, downloadFile, deleteFile }
