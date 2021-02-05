import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const VocalWarmups = (props) => {


    switch (props.module) {
        case 1:

            if(props.warmup === 1) {
                return (
                    <AuxWrapper>
                     My voice is my power, my strength and my vehicle for positive change in my life.
    
                    </AuxWrapper>
                )
            } 
            
        case 2:

            if(props.warmup === 1) {
                return (
                    <AuxWrapper>
                        I use my voice to be an advocate for myself and a beacon of hope for those who are around me.
                    </AuxWrapper>
                )
            }

        case 3:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                           I am truthful, I am open, I am vulnerable and these are my strengths that I value and know will set me free.
                        </AuxWrapper>
                    )
                }
        case 4:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            My Divine Light will not be extinguished and my voice will not be silenced by those who choose darkness.
                        </AuxWrapper>
                    )
                }
        case 5:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I speak truthfully and I listen intently so I may move with integrity and grow closer to my most authentic self.
                        </AuxWrapper>
                    )
                }
        case 6:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            It is through my spoken word that I shape my reality and it is with this power that I bring about peace and abundance in my life
                        </AuxWrapper>
                    )
                }
        case 7:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I am committed to speaking my truth clearly, precisely and with integrity.
                        </AuxWrapper>
                    )
                }
        case 8:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I am committed to expressing myself to the best of my ability all of the time so I may create a reality in which I flourish
                        </AuxWrapper>
                    )
                }
        case 9:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I am committed to improving myself because I love myself and deserve to embrace my highest self so I may fulfill my ultimate purpose
                        </AuxWrapper>
                    )
                }
        case 10:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I speak confidently<br />
                            I speak truthfully<br />
                            I speak clearly<br />
                            My speech is divine<br />
                        </AuxWrapper>
                    )
                }
        case 11:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            I move with integrity<br />
                            I move with authenticity <br />
                            I move with an open heart<br />
                            I speak true to my most authentic self<br />
                        </AuxWrapper>
                    )
                }
        case 12:

                if(props.warmup === 1) {
                    return (
                        <AuxWrapper>
                            My speech inspires<br />
                            My speech delights<br />
                            My speech is divine<br />
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