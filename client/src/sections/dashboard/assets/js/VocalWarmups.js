import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const VocalWarmups = (props) => {


    switch (props.module) {
        case 1:

            if(props.warmup === 1) {
                return (
                    <AuxWrapper>
                        Denise sees the fleece,<br />
                        Denise sees the fleas.<br />
                        At least Denise could sneeze<br />
                        and feed and freeze the fleas.<br />
    
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        The thirty-three thieves thought that they thrilled the throne throughout Thursday 
                    </AuxWrapper>
                )
            }
            
        case 2:

            if(props.warmup === 1) {
                return (
                    <AuxWrapper>
                        There was a fisherman named Fisher<br />
                        who fished for some fish in a fissure.<br />
                        Till a fish with a grin pulled the fisherman in.<br />
                        Now they're fishing the fissure for Fisher.<br />


                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        Can you can a can as a canner can can a<br /> can?  
                    </AuxWrapper>
                )
            }

        case 3:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            Luke Luck likes lakes. Luke's duck likes lakes.<br />
                            Luke Luck licks lakes. Luck's duck licks lakes.<br />
                            Duck takes licks in lakes that Luke Luck likes.<br />
                            Luke Luck takes licks in lakes duck likes.<br />


                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Six sick hicks nick six slick bricks with picks and<br />
                            sticks. 
                        </AuxWrapper>
                    )
                }
        case 4:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            One-one was a racehorse. <br />
                            Two-two was one, too.<br />
                            One-one won one race. <br />
                            Two-two won one too.<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            How can a clam cram in a clean cream can? 
                        </AuxWrapper>
                    )
                }
        case 5:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            How many cookies could a good cook cook If a good cook could cook cookies?<br />
                            A good cook could cook as much cookies as a good cook who could cook cookies. 

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Thistle sticks, sixty six thousand and six thistle sticks. 

                        </AuxWrapper>
                    )
                }
        case 6:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            How much ground would a groundhog hog, if a groundhog could hog ground?<br />
                            A groundhog would hog all the ground he could hog,<br /> if a groundhog could hog ground. 
                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Seth at Sainsbury's sells thick socks. 
                        </AuxWrapper>
                    )
                }
        case 7:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            Mary Mac's mother's making Mary Mac marry me.<br />
                            My mother's making me marry Mary Mac. <br />
                            Will I always be so merry when Mary's taking care of me? <br />
                            Will I always be so merry when I marry Mary Mac?<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Black background, brown background<br />
                            Black background, brown background<br />
                            Black background, brown background<br />

                        </AuxWrapper>
                    )
                }
        case 8:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            Through three cheese trees three free fleas flew.<br />
                            While these fleas flew, freezy breeze blew.<br />
                            Freezy breeze made these three trees freeze.<br />
                            Freezy trees made these trees' cheese freeze.<br />
                            That's what made these three free fleas sneeze. 

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Picky people pick Peter Pan Peanut-Butter<br />
                            'tis the peanut-butter picky people pick.<br />

                        </AuxWrapper>
                    )
                }
        case 9:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            How many cans can a cannibal nibble if a cannibal can nibble cans?<br />
                            As many cans as a cannibal can nibble if a cannibal can nibble cans.<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            If Stu chews shoes, should Stu choose the shoes he chews? 
                        </AuxWrapper>
                    )
                }
        case 10:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            How many berries could a bare berry carry,<br />
                            if a bare berry could carry berries? <br />
                            Well, they can't carry berries, which could make you very wary... <br />
                            but a bare berry carried is more scary!<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Six sleek swans swam swiftly southwards.
                        </AuxWrapper>
                    )
                }
        case 11:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            Yally Bally had a jolly golliwog.<br />
                            Feeling folly, Yally Bally bought his jolly golli a dollie made of holly!<br />
                            The golli', feeling jolly, named the holly dollie, Polly.<br />
                            So Yally Bally's jolly golli's holly dollie Polly's also jolly!<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            When you write copy you have the right to copyright the copy you write. 
                        </AuxWrapper>
                    )
                }
        case 12:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I'm not the fig plucker, nor the fig plucker's son.<br />
                            But I'll pluck figs till the fig plucker comes.<br />

                        </AuxWrapper>
                    )
                } else {
                    return (
                        <AuxWrapper>
                            Hassock hassock, black spotted hassock.<br />
                            Black spot on a black back of a black spotted hassock.<br />

                        </AuxWrapper>
                    )
                }
    
        default:
            return (
                <div>Nothing was found</div>
            )
    }

}

export default VocalWarmups;