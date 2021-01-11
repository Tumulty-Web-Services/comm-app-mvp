import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const WODExamples = (props) => {


    switch (props.module) {
        case 1:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "He stroked his beard and retired to his office to cogitate."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "Before responding to the difficult question, the woman paused to cogitate before answering."
                    </AuxWrapper>
                )
            }
        case 2:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "Scientists have postulated the existence of water on the far-off planet."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "The teacher postulated that his class’s low test scores were a result of his approach to teaching." 

                    </AuxWrapper>
                )
            }
        case 3:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "Thanks to the laudable efforts of dozens of volunteers, the town’s Winter Carnival was a major success."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "The retired mayor was recently celebrated for his laudable effort in reducing the rate of unemployment in the city by nearly 15%." 
                    </AuxWrapper>
                )
            }
        case 4:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "The accusations against the defendant were rather tenebrous given the lack of evidence provided by the prosecution."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "I had to take a break from analyzing the tenebrous text written during Julius Caesar’s time." 
                    </AuxWrapper>
                )
            }
        case 5:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "Law enforcement officials are trained to detect when a suspect fabricates an alibi."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                         "The scientist was accused of fabricating data." 
                    </AuxWrapper>
                )
            }
        case 6:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "The politician was criticized for not objurgating gun violence in America." 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "After coming across the vandalized desk, the teacher was forced to objurgate the misbehaving student."
                    </AuxWrapper>
                )
            }
        case 7:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "The audacious young man always seemed to make it a point to mock authority whenever he saw fit.
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "She made an audacious decision to quit her job two weeks before the holidays." 
                    </AuxWrapper>
                )
            }
        case 8:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "The biddable students were led astray by their manipulative professor." 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "When attempting to recruit, the military tends to target biddable men as young as 16." 
                    </AuxWrapper>
                )
            }
        case 9:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "Bill chose to recuse himself from taking sides in his best friends’ Ted and Angie’s argument."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "Through letters to the involved parties, she admitted to failing to recuse herself in all five of the cases."
                    </AuxWrapper>
                )
            }
        case 10:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "The king was admired for his lenity in dealing with those who have tried and failed to oppose the crown."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "One reason many people respected Hank was for his lenity in helping the impoverished."
                    </AuxWrapper>
                )
            }
        case 11:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "After having worked her fourth night shift, the waitress was in no mood to hear the crotchety old man carp about the restaurant’s decorations."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "The absent-minded husband couldn’t figure out why his wife kept carping at him to take a shower." 
                    </AuxWrapper>
                )
            }
        case 12:

            if(props.example === 1) {
                return (
                    <AuxWrapper>
                        "Visitors were often left aghast at the byzantine designs etched all over the surface of the newly-erected monument."
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        "The speaker’s byzantine explanation of basic neurobiology put the audience of 6th graders to sleep."
                    </AuxWrapper>
                )
            }
            

    
        default:
            return (
                <div>Nothing was found: WOD Examples</div>
            )
    }

}

export default WODExamples;