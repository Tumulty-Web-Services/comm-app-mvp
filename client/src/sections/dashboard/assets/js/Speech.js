import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const Speech = (props) => {

    switch (props.module) {
        case 1:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: What’s a song that transports you to a time in the past? Where does that song take you?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: What is your favorite artist? 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: What is your favorite artist? 
                    </AuxWrapper>
                )
            }
        case 2:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What makes a good person “good”?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What is a possession of yours that you value deeply? 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What is one thing every friendship needs?                     
                    </AuxWrapper>
                )
            }
        case 3:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: What is one thing you should let go of?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: What is one habit you think you should form?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: What was the kindest thing you’ve ever done for someone else?
                    </AuxWrapper>
                )
            }
        case 4:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Life Lessons<br/><br/>
                        Q: What’s the most important lesson you’ve learned about people?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Life Lessons<br/><br/>
                        Q: What’s the most important lesson you’ve learned about love?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Life Lessons<br/><br/>
                        Q: What’s the most important lesson you’ve learned about friendship?
                    </AuxWrapper>
                )
            }
        case 5:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: What’s your favorite snack? 
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                       <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: What is one thing the world could do without?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: What’s one skill you wish you could learn overnight? 
                    </AuxWrapper>
                )
            }
        case 6:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Dreams<br/><br/>
                        Q: What do you usually dream about? 
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Dreams<br/><br/>
                        Q: What is the most vivid dream you remember? What do you think it meant? 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Dreams<br/><br/>
                        Q: Where do you think dreams come from? Are they meaningful or are they just random events? 
                    </AuxWrapper>
                )
            }
        case 7:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: Do you lie to yourself? 
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                       <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: What do you need to forgive yourself for? 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-reflection<br/><br/>
                        Q: What are you most proud of yourself for doing? 
                    </AuxWrapper>
                )
            }
        case 8:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Nostalgia<br/><br/>
                        Q: What was your first favorite band? How old were you?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                       <strong>Theme: </strong>Nostalgia<br/><br/>
                        Q: You’re allowed to go back in time to your childhood and you can bring back one, single item. What are you bringing back?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Nostalgia<br/><br/>
                        Q: Is there a particular decade you wish you could go back to and visit or live in?                      
                    </AuxWrapper>
                )
            }
        case 9:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: Who is someone in your life you admire?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: What’s your guilty pleasure? 
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Miscellaneous<br/><br/>
                        Q: What are you most grateful for?
                    </AuxWrapper>
                )
            }
        case 10:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What does your own personal heaven look like?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What does it mean to be a friend?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Meaning<br/><br/>
                        Q: What is the most important virtue?
                    </AuxWrapper>
                )
            }
        case 11:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-Reflection<br/><br/>
                        Q: What’s one small thing you could start doing tomorrow that would improve your life?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-Reflection<br/><br/>
                        Q: What is one habit you have that you think you should stop?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Self-Reflection<br/><br/>
                        Q: How would you describe yourself in five words?
                    </AuxWrapper>
                )
            }
        case 12:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: Who is your favorite solo artist? 
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: What do you notice first in a song? The lyrics? The instruments? The vocals?  
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        <strong>Theme: </strong>Music<br/><br/>
                        Q: What song or artist do you put on when you’re sad?
                    </AuxWrapper>
                )
            }

        default:
            return (
                <div>Nothing was found: Speech</div>
            )
    }

}

export default Speech;