const AWS = require('aws-sdk');
const fs = require('fs')
const s3 = new AWS.S3({
    region: 'sa-east-1',
    accessKeyId: 'AKIAR47PTWJ7KGQAAJ7P',
    secretAccessKey: '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'
});

const uploadFile = (file) => {
    // Read content from the file
    const fileStream = fs.createReadStream(file.path);

    // Setting up S3 upload parameters
    const params = {
        Bucket: "luchoqq-lapstore",
        Body: fileStream,
        Key: file.filename, // File name you want to save as in S3
    };

    // Uploading files to the bucket
    return s3.upload(params).promise(); 

}


// download file from s3
function downloadFile(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: process.env.AWS_BUCKET_NAME,
    };
  
    return s3.getObject(downloadParams).createReadStream();
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
