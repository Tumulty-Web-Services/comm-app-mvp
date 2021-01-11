//this is voice.js should be a route

/*
Documentation

This file holds the routes for connecting to twillio
uses and old example, change for app uses

*/

const keys = require('../../../keys');

const db = require('../../../models');
const SurveyResponse = db.responses;
const VoiceResponse = require('twilio').twiml.VoiceResponse;



const client = require('twilio')(keys.TWILIO_SID, keys.TWILIO_AUTH_TOKEN);

//used to translate twillio body of the request
var urlencoded = require('body-parser').urlencoded;

module.exports = (app) => {

    //the url are survey is sent to from twilio. Only used by requests by twilio
    app.post('/twilio/voice',  urlencoded({ extended: true }), (req, response) => {

        //set our survey questions
        const survey = [{
                text: 'Tell me about a time when you made a great connection over the phone. Press any key when you are done.',
                type: 'text'
            },
            {
                text: 'Tell me about a time when you had to show empathy in a tough situation with a customer. Press any key when you are done.',
                type: 'text'
            },
            {
                text: 'Tell me about a time when you had to deal with a difficult customer and created a positive outcome. Press any key when you are done.',
                type: 'text'
            }
        ];

        const surveyLength = survey.length


        var phone = req.body.To;
        var input = req.body.RecordingUrl || req.body.Digits;
        var twiml = new VoiceResponse();


        // helper to append a new "Say" verb with alice voice
        function say(text) {
            twiml.say({
                voice: 'alice'
            }, text);
        }

        // respond with the current TwiML content
        function respond() {
            response.type('text/xml');
            response.send(twiml.toString());
        }

        // Find an in-progess survey if one exists, otherwise create one
        advanceSurvey({
            phone: phone,
            input: input,
            survey: survey
        }, function (err, surveyResponse, questionIndex) {


            var question = survey[questionIndex];

            // if (err || !surveyResponse) {
            if (err || !surveyResponse) {
                say('Terribly sorry, but an error has occurred. Goodbye.');
                return respond();
            }

            // If question is null, we're done!
            if (!question) {
                say('Thank you for taking this survey. Goodbye!');
                return respond();
            }

            //Add a greeting if this is the first question
            if (questionIndex === 0) {
                say('Thank you for taking our survey. Please listen carefully ' +
                    'to the following questions.');
            }

            // Otherwise, ask the next question
            say(question.text);

            // Depending on the type of question, we either need to get input via
            // DTMF tones or recorded speech
            if (question.type === 'text') {
                // say('Please record your response after the beep. ' +
                //     'Press any key to finish.');
                twiml.record({
                    transcribe: true,
                    transcribeCallback: '/voice/' + surveyResponse.id +
                        '/transcribe/' + questionIndex,
                    maxLength: 60
                });
            } else if (question.type === 'boolean') {
                say('Press one for "yes", and any other key for "no".');
                twiml.gather({
                    timeout: 10,
                    numDigits: 1
                });
            } else {
                // Only other supported type is number
                say('Enter the number using the number keys on your telephone.' +
                    ' Press star to finish.');
                twiml.gather({
                    timeout: 10,
                    finishOnKey: '*'
                });
            }

            // render TwiML response
            respond();

        });

    })


    app.post('/voice/:responseId/transcribe/:questionIndex', urlencoded({ extended: true }),  function (req, response) {

        var responseId = req.params.responseId;
        var questionIndex = req.params.questionIndex;
        var transcript = req.body.TranscriptionText;

        SurveyResponse.findById(responseId)
        .then(surveyResponse => {
           
            if(transcript !== undefined) {
                // Update appropriate answer field
                surveyResponse.responses[questionIndex].answer = transcript;
            }
    
            surveyResponse.save()
            .then( () => {
                return response.status( 200).end();
            })
            .catch(error => {
                return response.status(500).end();
            })
            

          })
          .catch(err => {
            if (err || !surveyResponse || !surveyResponse.responses[questionIndex]) {

                return response.status(500).end();
            }
                
          })
    });


    app.post('/twilio/call/form/:phone',   function (req, res) {

        const phone = req.params.phone;
        console.log(phone)

        if(!phone) {
            res.status(401).send();
        }


        client.calls
        .create({
            url: 'https://sheltered-lake-19908.herokuapp.com/twilio/voice',
            to: phone,
            from: '+19736298826',
        })
        .then(call => process.stdout.write(call.sid));

        res.status(200).send();

        
    });

    //find responses by phone number
    app.get('/api/responses/find/:phone', async (req, res) => {

        

        const phone = req.params.phone;

        console.log(phone)

        if(!phone) {
            res.status(401).send();
        }

        let response = await SurveyResponse.findOne({
            where: {
                phone: phone,
                complete: true
            },
        });

        res.json(response);


    });

};




advanceSurvey = async (args, cb) => {

    var surveyData = args.survey;
    var phone = args.phone;
    var input = args.input;
    var surveyResponse;

    // Find current incomplete survey
    const doc = await SurveyResponse.findOne({
        where: {
            phone: phone,
            complete: false
        },
    });

    surveyResponse = doc || new SurveyResponse({
        phone: phone
    });

    
    processInput(surveyResponse);

    // fill in any answer to the current question, and determine next question
    // to ask
    function processInput(surveyResponse) {

        // If we have input, use it to answer the current question
        var responseLength = 0;
        if(surveyResponse.responses) {
            responseLength = surveyResponse.responses.length;
        }
        var currentQuestion = surveyData[responseLength];

        // if there's a problem with the input, we can re-ask the same question
        function reask() {
            cb.call(surveyResponse, null, surveyResponse, responseLength);
        }

        // If we have no input, ask the current question again
        if (!input) return reask();

        // Otherwise use the input to answer the current question
        var questionResponse = {};
        if (currentQuestion.type === 'boolean') {
            // Anything other than '1' or 'yes' is a false
            var isTrue = input === '1' || input.toLowerCase() === 'yes';
            questionResponse.answer = isTrue;
        } else if (currentQuestion.type === 'number') {
            // Try and cast to a Number
            var num = Number(input);
            if (isNaN(num)) {
                // don't update the survey response, return the same question
                return reask();
            } else {
                questionResponse.answer = num;
            }
        } else if (input.indexOf('http') === 0) {
            // input is a recording URL
            questionResponse.recordingUrl = input;
        } else {
            // otherwise store raw value
            questionResponse.answer = input;
        }

        // Save type from question
        questionResponse.type = currentQuestion.type;


        if(surveyResponse.responses === undefined) {
            surveyResponse.responses = [questionResponse]
        } else {
            let newResponses = surveyResponse.responses;
            
            newResponses.push(questionResponse)
            surveyResponse.responses = newResponses;
        }

        
        // If new responses length is the length of survey, mark as done
        if (surveyResponse.responses.length === surveyData.length) {
            surveyResponse.complete = true;
        }
        surveyResponse.save()
        .then(surveyResponse => {

            cb.call(surveyResponse, null, surveyResponse, responseLength + 1);
          })
          .catch(error => {
                console.log('error thrown', err)
                reask();
          })

       
    }
};
