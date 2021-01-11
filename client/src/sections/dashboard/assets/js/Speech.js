import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const Speech = (props) => {

    switch (props.module) {
        case 1:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What harsh truths do you prefer to ignore?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        Do you operate on fear or faith?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        Where do you find meaning in your life?
                    </AuxWrapper>
                )
            }
        case 2:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        Is happiness just chemicals flowing through your brain? Or is it something more?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        How much do you think language affects our thinking?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        Why are humans so confident in beliefs that cannot be proven?
                    </AuxWrapper>
                )
            }
        case 3:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What would be the most ethical way to give away $5 million?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What super power would you want? Why?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        If you were a fruit, what fruit would you be? Why? 
                    </AuxWrapper>
                )
            }
        case 4:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        Can a society exist without laws?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What is the best way for a person to find happiness?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What makes an evil person evil?
                    </AuxWrapper>
                )
            }
        case 5:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What is the most important goal every person should have?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        Does fate exist? If so, do we have free will?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What do you think your future self will remember about you now?
                    </AuxWrapper>
                )
            }
        case 6:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What makes a good person good?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What is something you’ll NEVER do again?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What event in your life would make for a good movie?

                    </AuxWrapper>
                )
            }
        case 7:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What is the strangest thing you have ever come across?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What would you do if you knew you were going to die in one hour?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What risks are worth taking?
                    </AuxWrapper>
                )
            }
        case 8:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What’s the biggest challenge in your life right now?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        How would you describe your sense of humor?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What’s the hardest lesson you’ve ever learned?
                    </AuxWrapper>
                )
            }
        case 9:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        If your childhood had a smell, what would it be?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        If your life was a book, what would its title be? Why?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What makes a person beautiful?
                    </AuxWrapper>
                )
            }
        case 10:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What scares you?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What is your guilty pleasure?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What is something you’re obsessed with?

                    </AuxWrapper>
                )
            }
        case 11:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What makes you nervous? Why?
                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        Who’s your favorite musician or band? Why?
                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        What makes for a true friend?
                    </AuxWrapper>
                )
            }
        case 12:

            if (props.question === 1) {
                return (
                    <AuxWrapper>
                        What is your biggest flaw?

                    </AuxWrapper>
                )
            } else if (props.question === 2) {
                return (
                    <AuxWrapper>
                        What’s your favorite food? Why?

                    </AuxWrapper>
                )
            } else {
                return (
                    <AuxWrapper>
                        If all your memories were erased, what kind of person would you be?
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