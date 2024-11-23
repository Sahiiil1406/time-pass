const { S3Client, GetObjectCommand ,PutObjectCommand} = require("@aws-sdk/client-s3");
const { createPresignedPost,getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
    }
 });

const getPresignedUrl = async (key) => {
   try {
   
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME ,
        Key: key,
        expiresIn: 3600,
    });
    
    const url= await getSignedUrl(s3Client,command);
    //console.log("Presigned URL: ", url);
    
    return {url};
   } catch (error) {
    console.log(error.message)
   }
 }

//https://synkerr.s3.us-east-1.amazonaws.com/Screenshot%202023-09-14%20152038.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb
module.exports = { getPresignedUrl };    


/* 

 */ 