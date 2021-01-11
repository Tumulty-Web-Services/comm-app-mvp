import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const VocalWarmups = (props) => {

    switch (props.module) {
        case 1:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/cogitate" target="_blank" rel="noopener noreferrer">cogitate</a>
                    (verb) ˈkäjəˌtāt<br/>
                    think deeply about something; meditate or reflect
                </AuxWrapper>
            )

        case 2:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/postulate" target="_blank" rel="noopener noreferrer">postulate</a>
                    (verb)<br/>
                    ˈpäsCHəˌlāt<br/>
                    suggest or assume the existence, fact, or truth of (something) as a basis for
                    reasoning, discussion, or belief

                </AuxWrapper>
            )
        case 3:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/laudable" target="_blank" rel="noopener noreferrer">laudable</a>
                    (adjective)<br/>
                    LAW-duh-bul
                    <br/>
                    worthy of praise ; commendable

                </AuxWrapper>
            )
        case 4:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/tenebrous" target="_blank" rel="noopener noreferrer">tenebrous</a>
                    (adjective)<br/>
                    TEN-uh-brus
                    <br/>
                    Hard to understand; obscure Shut off from the light; dark, murky

                </AuxWrapper>
            )
        case 5:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/fabricate" target="_blank" rel="noopener noreferrer">fabricate</a>
                    (verb)<br/>
                    ˈfabrəˌkāt
                    <br/>
                    invent or concoct (something), typically with deceitful intent construct,
                    manufacture, create

                </AuxWrapper>
            )
        case 6:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/objurgate" target="_blank" rel="noopener noreferrer">objurgate</a>
                    (verb)<br/>
                    ob-jer-geyt
                    <br/>
                    to reproach or denounce vehemently; upbraid harshly; berate
                </AuxWrapper>
            )
        case 7:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/audacious" target="_blank" rel="noopener noreferrer">audacious</a>
                    (adjective)<br/>
                    aw-DAY-shus
                    <br/>
                    bold, daring, intrepid, reckless showing lack of respect
                </AuxWrapper>
            )
        case 8:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/biddable" target="_blank" rel="noopener noreferrer">biddable</a>
                    (adjective)<br/>
                    BID-uh-bul
                    <br/>
                    easily led, taught or controlled
                </AuxWrapper>
            )
        case 9:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/recuse" target="_blank" rel="noopener noreferrer">recuse</a>
                    (verb)<br/>
                    rih-KYOOZ
                    <br/>
                    to remove one’s self from participation to avoid a conflict of interest
                </AuxWrapper>
            )
        case 10:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/lenity" target="_blank" rel="noopener noreferrer">lenity</a>
                    (noun)
                    <br/>
                    len-i-tee
                    <br/>
                    the quality or state of being mild or gentle, as toward others ; merciful
                </AuxWrapper>
            )
        case 11:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/carp" target="_blank" rel="noopener noreferrer">carp</a>
                    (verb)
                    <br/>
                    KAHRP
                    <br/>
                    To find fault or complain unreasonably
                </AuxWrapper>
            )
        case 12:

            return (
                <AuxWrapper>
                    <a href="https://www.merriam-webster.com/dictionary/Byzantine" target="_blank" rel="noopener noreferrer">byzantine</a>
                    (adjective)
                    <br/>
                    biz-uh-n-teen
                    <br/>
                    complex or intricate
                </AuxWrapper>
            )

        default:
            return (
                <div>Nothing was found: WOD</div>
            )
    }

}

export default VocalWarmups;