import Axios from 'axios';
import { createSystemLog } from '../db-helpers/system-logs'


/*
Documentation

example of sending email

const email = await sendgridEmail({
    from: 'johnmaher1245@gmail.com',
    to: 'johnmaher1245@gmail.com',
    subject: 'my email subject',
    text: 'here is my email text',
    html: '<strong>here is my email text</strong>'
})


*/
export const sendgridEmail = async (settings) => {

    return new Promise (async function (resolve, reject) {
        try {

            const res = await Axios({
                method:'post',
                url:'/api/v1/sendgrid/send',
                data: {
                    email: {...settings}
                }
            })
    
            if(res.data.success) {

                resolve({success: true})

            } else {

                console.log('Error sending email: internal code contact 1 ' + res.data.message);
                createSystemLog('Error sending email: internal code contact 1 ' + res.data.message, 1, 1)
                resolve({success: false})

            }
          
          } catch(e) {
          
            console.log('Error sending email: internal internal code 2', e);
            createSystemLog('Error sending email: internal internal code 2 ' + e, 1, 1)
            resolve({success: false})
          
          }
    })
    
}