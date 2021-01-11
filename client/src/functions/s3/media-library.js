

import Axios from 'axios';
import {
    reduceFileSize
} from '../images/img-processing';
// import { FILE } from 'dns';

// /*
// Documentation

// this function takes a file and bucket name and uploads a picture or imge to s3

// **** note that if you upload a pdf the property to get the url is still .imgUrl on the receiving end

// there is no size reduction or image cropping, images go as they are

// */
// export default function (file, bucket) {
//     return new Promise(async function (resolve, reject) {

//         console.log('main')

//         var formData = new FormData();
//         formData.append("image", file);


//         try {

//             const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Accept-Language': 'en-US,en;q=0.8',
//                     'Content-Type': `multipart/form-data`,
//                 }
//             })

//             resolve({
//                 success: true,
//                 message: '',
//                 imgUrl: result.data.imageUrl
//             });


//         } catch (e) {

//             //console log the error
//             console.log('Error ', e)
//             resolve({
//                 success: false,
//                 message: e.message,
//                 imgUrl: ''
//             });

//         }

//     });
// }


// /*
// Documentation

// this function takes the bucket parameter and file parameter as standard in this file
// In this case we will crop an image to max height and with of 100 pixels as it is just a profile pic

// */
// export function uploadProfilePic(file, bucket) {

//     return new Promise(async function (resolve, reject) {


//         reduceFileSize(file, 100 * 100, 100, Infinity, 0.9, async (blob) => {
//             let body = new FormData();

//             function blobToFile(theBlob, fileName) {

//                 //A Blob() is almost a File() - it's just missing the two properties below which we will add\
//                 return new File([blob], fileName, {
//                     type: 'image/png',
//                     lastModified: Date.now()
//                 });

//             }

//             var myFile = blobToFile(blob, "my-image.png");
//             body.append("image", myFile);


//             try {

//                 let formData = body;
//                 const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
//                     headers: {
//                         'accept': 'application/json',
//                         'Accept-Language': 'en-US,en;q=0.8',
//                         'Content-Type': `multipart/form-data`,
//                     }
//                 })

//                 console.log(result)

//                 resolve({
//                     success: true,
//                     message: '',
//                     imgUrl: result.data.imageUrl
//                 });


//             } catch (e) {

//                 //console log the error
//                 console.log('Error ', e)
//                 resolve({
//                     success: false,
//                     message: e.message,
//                     imgUrl: ''
//                 });

//             }
//         });

//     });
// }

// /*
// Documentation

// this function takes the bucket parameter and file parameter as standard in this file
// In this case we will crop an image to max height width of 1500 px and height of 1200 pixels
// THese images are meant for background however not perfectly optimized.
// Offers some control on uploading pictures meant to be full screen background images

// */
// export function uploadBackground(file, bucket) {
//     return new Promise(async function (resolve, reject) {


//         reduceFileSize(file, 1500 * 1200, 1500, Infinity, 0.9, async (blob) => {
//             let body = new FormData();

//             function blobToFile(theBlob, fileName) {

//                 //A Blob() is almost a File() - it's just missing the two properties below which we will add\
//                 return new File([blob], fileName, {
//                     type: 'image/png',
//                     lastModified: Date.now()
//                 });

//             }

//             var myFile = blobToFile(blob, "my-image.png");
//             body.append("image", myFile);


//             try {

//                 let formData = body;
//                 const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
//                     headers: {
//                         'accept': 'application/json',
//                         'Accept-Language': 'en-US,en;q=0.8',
//                         'Content-Type': `multipart/form-data`,
//                     }
//                 })

//                 resolve({
//                     success: true,
//                     message: '',
//                     imgUrl: result.data.imageUrl
//                 });


//             } catch (e) {

//                 //console log the error
//                 console.log('Error ', e)
//                 resolve({
//                     success: false,
//                     message: e.message,
//                     imgUrl: ''
//                 });

//             }
//         });

//     });
// }

// export function uploadMediumSquare(file, bucket) {
//     return new Promise(async function (resolve, reject) {


//         reduceFileSize(file, 500 * 500, 500, Infinity, 0.9, async (blob) => {
//             let body = new FormData();

//             function blobToFile(theBlob, fileName) {

//                 //A Blob() is almost a File() - it's just missing the two properties below which we will add\
//                 return new File([blob], fileName, {
//                     type: 'image/png',
//                     lastModified: Date.now()
//                 });

//             }

//             var myFile = blobToFile(blob, "my-image.png");
//             body.append("image", myFile);


//             try {

//                 let formData = body;
//                 const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
//                     headers: {
//                         'accept': 'application/json',
//                         'Accept-Language': 'en-US,en;q=0.8',
//                         'Content-Type': `multipart/form-data`,
//                     }
//                 })

//                 resolve({
//                     success: true,
//                     message: '',
//                     imgUrl: result.data.imageUrl
//                 });


//             } catch (e) {

//                 //console log the error
//                 console.log('Error ', e)
//                 resolve({
//                     success: false,
//                     message: e.message,
//                     imgUrl: ''
//                 });

//             }
//         });

//     });
// }

// /*
// Documentation

// this function takes the bucket parameter and file parameter as standard in this file
// In this case we will crop an image to max height width of 1500 px and height of 1200 pixels
// THese images are meant for background however not perfectly optimized.
// Offers some control on uploading pictures meant to be full screen background images

// */
// export function uploadCustomResize(file, bucket, dimensions, maxWidth) {
//     return new Promise(async function (resolve, reject) {


//         reduceFileSize(file, dimensions, maxWidth, Infinity, 0.9, async (blob) => {
//             let body = new FormData();

//             function blobToFile(theBlob, fileName) {

//                 //A Blob() is almost a File() - it's just missing the two properties below which we will add\
//                 return new File([blob], fileName, {
//                     type: 'image/png',
//                     lastModified: Date.now()
//                 });

//             }

//             var myFile = blobToFile(blob, "my-image.png");
//             body.append("image", myFile);


//             try {

//                 let formData = body;
//                 const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
//                     headers: {
//                         'accept': 'application/json',
//                         'Accept-Language': 'en-US,en;q=0.8',
//                         'Content-Type': `multipart/form-data`,
//                     }
//                 })

//                 resolve({
//                     success: true,
//                     message: '',
//                     imgUrl: result.data.imageUrl
//                 });


//             } catch (e) {

//                 //console log the error
//                 console.log('Error ', e)
//                 resolve({
//                     success: false,
//                     message: e.message,
//                     imgUrl: ''
//                 }); 

//             }
//         });

//     });
// }

/*
Documentation
this function and the bottom one can be refactored into one
*/
export function uploadImg(inputID, bucket, dimensions, maxWidth) {

    return new Promise(async function (resolve, reject) {

        //see if user uploaded a new profile pic
        var FILE_INPUT = document.querySelector(inputID);
        const file = FILE_INPUT.files[0];


        if (file !== undefined) {

            reduceFileSize(file, dimensions, maxWidth, Infinity, 0.9, async (blob) => {
                let body = new FormData();

                function blobToFile(theBlob, fileName) {

                    //A Blob() is almost a File() - it's just missing the two properties below which we will add\
                    return new File([blob], fileName, {
                        type: 'image/png',
                        lastModified: Date.now()
                    });

                }

                var myFile = blobToFile(blob, "image.png");
                body.append("object", myFile);
                // body.append("image", file);




                try {

                    let formData = body;

                    const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data`,
                        }
                    })

                    resolve({success: true, object_url: result.data.imageUrl, objectKey: result.data.objectKey}) 

                } catch (e) {

                    //console log the error
                    console.log('Error ', e)
                    resolve({success: false, message: e})


                }
            });


        } else {


            resolve({success: false, message: 'No inputID was passed to function uploadImg'})

        }

    });


}

export function uploadImgFile(file, bucket, dimensions, maxWidth) {

    return new Promise(async function (resolve, reject) {

       

        if (file !== undefined) {

            reduceFileSize(file, dimensions, maxWidth, Infinity, 0.9, async (blob) => {
                let body = new FormData();

                function blobToFile(theBlob, fileName) {

                    //A Blob() is almost a File() - it's just missing the two properties below which we will add\
                    return new File([blob], fileName, {
                        type: 'image/png',
                        lastModified: Date.now()
                    });

                }

                var myFile = blobToFile(blob, "image.png");
                body.append("object", myFile);
                // body.append("image", file);




                try {

                    let formData = body;


                    const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data`,
                        }
                    })

                    resolve({success: true, object_url: result.data.imageUrl, objectKey: result.data.objectKey}) 

                } catch (e) {

                    //console log the error
                    console.log('Error ', e)
                    resolve({success: false, message: e})


                }
            });


        } else {


            resolve({success: false, message: 'No inputID was passed to function uploadImg'})

        }

    });


}

export function uploadVideoFile(file, bucket) {

    return new Promise(async function (resolve, reject) {

       

        if (file !== undefined) {

            const formData = new FormData();
            formData.append('object', file);

                try {

                    const result = await Axios.post('/api/aws/upload/s3?bucket=' + bucket, formData, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data`,
                        }
                    })

                    resolve({success: true, object_url: result.data.imageUrl, objectKey: result.data.objectKey}) 

                } catch (e) {

                    //console log the error
                    console.log('Error ', e.response.data.error)
                    resolve({success: false, message: e.response.data.error})


                }


        } else {


            resolve({success: false, message: 'No inputID was passed to function uploadImg'})

        }

    });


}

export function getS3ImageUrl(key) {
    return 'https://s3.us-east-2.amazonaws.com/commappvideos/'+key.replace(/ /g, '+')+''
}