/*
Documentation

this page handles all our server routes for working with aws s3
img and pdf uploads are handled under the route /aws/upload/s3

a helper function was created to work with this route under frontend/src/functions/UploadS3

***NOTE you do not need to create a bucket in s3 to upload to it, simply sending data to it creates it

*/
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const fs = require('fs');
const keys = require('../../../keys');

aws.config.update({

  secretAccessKey: keys.S3_SECRET_ACCESS_KEY,
  accessKeyId: keys.S3_ACCESS_KEY_ID,
  region: 'us-east-2', // region of your bucket
});

const s3 = new aws.S3();

function awsS3Controller(router) {
  router.post('/api/aws/upload/s3', (req, res) => {
    // if bucket was not passed to the request return an error
    if (!req.query.bucket) {
      return res.status(422).send({ errors: [{ title: 'Invalid URL Passed', detail: 'You did not pass the bucket param to your request' }] });
    }

    // bucket is where we are storing this data
    const upload = multer({
      storage: multerS3({
        s3,

        // this is the bucket we are sending to
        bucket: req.query.bucket,
        acl: 'public-read',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
          cb(null, `${Date.now().toString()}.${file.originalname.split('.').pop()}`);
        },
      }),
    });

    const singleUpload = upload.single('object');

    singleUpload(req, res, (err, some) => {
      if (err) {
        console.log('error', err.message);
        return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
      }

      try {
        return res.json({ imageUrl: req.file.location, objectKey: req.file.key });
      } catch (e) {
        console.log('error', e.message);
        return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: e.message }] });
      }
    });
  });
  // router.post('/api/aws/upload_video/s3', (req, res) => {

  //   //if bucket was not passed to the request return an error
  //   if(!req.query.bucket) {
  //     return res.status(422).send({errors: [{title: 'Invalid URL Passed', detail: 'You did not pass the bucket param to your request'}] });
  //   }

  //   var myKey = Date.now().toString();
  //   //for text file
  //   //fs.readFile('demo.txt', function (err, data) {
  //   //for Video file
  //   //fs.readFile('demo.avi', function (err, data) {
  //   //for image file

  //   fs.readFile('a.MOV', function (err, data) {
  //     if (err) { throw err; }

  //        params = {Bucket: req.query.bucket, Key: myKey, Body: data };

  //        s3.putObject(params, function(err, data) {

  //            if (err) {

  //                console.log(err)

  //            } else {

  //                console.log("Successfully uploaded data to myBucket/myKey");

  //            }

  //         });

  //   });

  // });

  router.get('/api/aws/bucket/list', async (req, res) => {
    const keys = await allBucketKeys(s3, 'commappvideos');

    async function allBucketKeys(s3, bucket) {
      const params = {
        Bucket: bucket,
      };

      const keys = [];
      for (;;) {
        const data = await s3.listObjects(params).promise();

        data.Contents.forEach((elem) => {
          keys.push({ key: elem.Key, last_modified: elem.LastModified });
        });

        if (!data.IsTruncated) {
          break;
        }
        params.Marker = data.NextMarker;
      }

      return keys;
    }

    res.send(keys);
  });

  router.post('/api/aws/bucket/delete', async (req, res) => {
    if (!req.query.key) {
      res.send({ success: false, message: 'No key was sent' });
    }

    const { key } = req.query;

    const params = { Bucket: 'commappvideos', Key: key };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        res.send({ success: false, message: err.stack });
      }

      res.send({ success: true, key });
    });
  });

  return router;
}

module.exports = awsS3Controller;
