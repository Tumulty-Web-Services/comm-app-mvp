import React from 'react'
import AuxWrapper from '../../../../globalComponents/AuxWrapper'

const Speech = (props) => {

    switch (props.module) {
        case 1:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Music</p>
                <p>This session’s theme will focus on the complex vibrations we refer to as “music” that serve to uplift our souls.</p>
            </AuxWrapper>
          )
        case 2:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Meaning</p>
                <p>This session’s theme will focus on the various What’s and Why’s in our lives.</p>
            </AuxWrapper>
          )
        case 3:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Self-reflection</p>
                <p>This session’s theme will encourage you to look inward. </p>
            </AuxWrapper>
          )
        case 4:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Life Lessons</p>
                <p>This session will focus on many lessons we learn during our journey through life.</p>
            </AuxWrapper>
          )
        case 5:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Miscellaneous</p>
                <p>This session’s theme is a mix of random questions to engage you.</p>
            </AuxWrapper>
          )
        case 6:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Dreams</p>
                <p>This session’s theme focuses on the places we go and who we are while asleep.</p>
            </AuxWrapper>
          )
        case 7:
          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Self-reflection</p>
                <p>This session’s theme will encourage you to look inward.</p>
            </AuxWrapper>
          )
        case 8:

          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Nostalgia</p>
                <p>This session’s theme will encourage you to look back fondly.</p> 
            </AuxWrapper>
          )
        case 9:

          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Miscellaneous</p>
                <p>This session’s theme is a collection of random questions to engage you.</p> 
            </AuxWrapper>
          )
        case 10:

          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Meaning</p>
                <p>This session’s theme focuses on the various What’s and Why’s in our lives.</p>
            </AuxWrapper>
          )
        case 11:

          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Self-Reflection</p>
                <p>This session’s theme will encourage you to look inward.</p>
            </AuxWrapper>
          )
        case 12:

          return (
            <AuxWrapper>
                <p className="mb-1"><strong>Theme: </strong>Music</p>
                <p>This session’s theme will focus on the complex vibrations we refer to as “music” that serve to uplift our souls. </p>
            </AuxWrapper>
          )

        default:
            return (
                <div>Nothing was found: ISQ explanation found</div>
            )
    }

}

export default Speech;