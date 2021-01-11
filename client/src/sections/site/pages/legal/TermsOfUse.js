import React, {Component} from 'react';

import AuxWrapper from '../../../../globalComponents/AuxWrapper';




class TermsOfUse extends Component {

    componentDidMount = () => {
        window.scrollTo(0,0)
    }

    render() {

        
        return (

            <AuxWrapper >



                
                <div className="main dark page-home">

                    <div className="container z-depth-3" style={{marginTop: 75, marginBottom: 75,  background: 'white', color: 'black',  padding: 40, borderRadius: 6}}>
                        <h2 className="title" style={{color: 'black'}}>Comm App Privacy Policy</h2>

                        <h5 className="">We want you to feel safe when you're using the COMM App, which is why we
                            took the time to draft this policy. Please understand your personal information is safe with us.
                            We only require it in order for you to properly use the COMM App trial.</h5>

                        <h5 className="">This Privacy Policy (“Privacy Policy”) governs the manner in which COMM App
                            (the “Company,” “we,” “us”) collects, uses, maintains and discloses information collected from
                            users (“User, “you, or “your”) of the <a className="text-info" href="www.commappmvp.com" target="_blank" rel="noreferrer noopener">www.commappmvp.com</a> website (“Website” or “Site). This
                            Privacy Policy applies to the Site. By accessing, using this site or providing Personal
                            Information to us, you agree to be bound by the Privacy Policy.</h5>

                        <h5 className="">When using the Site, you will find links to m-w.com (Merriam Webster
                            Dictionary website). COMM App is not responsible for the privacy practices of this other website
                            and we recommend that you
                            review the privacy policies of this website before use.</h5>

                        <h5 className="">"We may revise the Privacy Policy at any time and you should visit this page periodically to
                            review the Terms. We reserve the right to update or modify these terms at any time without prior
                            notice. Your use of the site following any such change constitutes your agreement to follow and
                            be bound by the Privacy Policy as changed. If we are involved in a reorganization, merger, acquisition, or sale of our assets, your information may be transferred as part of that deal. We will notify you (for example, via a message to the email address associated with your account) of any such deal and outline your choices in that event."
                        </h5>

                        <h2 className="title" style={{color: 'black'}}>Personal Information We Collect</h2>

                        <h5 className="">In order to provide this trial to you, we do require you to provide certain
                            information to us. Common items may include, but are not limited to, your name tied to either
                            your Facebook or Google login (“Personal Information”). By providing Personal Information to us,
                            you are agreeing to allow us to utilize this Personal Information to complete all operations you
                            request through this Website and to disclose that information and user-generated content to COMM
                            App. </h5>

                        <h5 className="">We use standard practices for keeping such user-generated data confidential,
                            but there is no guarantee that such practices will prevent the disclosure or further
                            distribution of such data beyond the COMM App.</h5>

                        <h2 className="title"style={{color: 'black'}}>How We Use Your Personal Information</h2>

                        <h5 className="">We use the Personal Information (via your Facebook or Google account) that
                            we collect about you for the following purposes:</h5>

                        <ol>
                            <li>To operate and maintain your account and to provide you with access to the Website and
                                use of the COMM App trial. Your Google or Facebook account are used to identify you when you
                                sign into the Website. We use this account information in order to have your name connected
                                to the data files you will be creating during sessions using the COMM App (i.e. your
                                Impromptu Speech Question recorded video responses). Nothing will be posted on your Facebook
                                or Google accounts. Nor will we retrieve any other account information besides the First &
                                Last name and the email connected to your account.
                            </li>
                            <li>To provide feedback/critique to user-generated content (i.e. Impromptu Speech Question
                                responses)</li>
                            <li>To provide you with technical support (if need be)</li>
                            <li>To respond to you about any comment or inquiry you have submitted.</li>
                            <li>To send you important information regarding the Site, changes to our terms, conditions
                                and policies and other administrative information as well as your Impromptu Speech Question
                                critiques and ultimately, your exit survey.
                            </li>
                            <li>To facilitate social sharing functionality (in the future).</li>
                        </ol>

                        <h2 className="title" style={{color: 'black'}}>How Your Personal Information Is Shared</h2>

                        <h5 className="">We will not share your Personal Information with any third party.</h5>

                        <h5 className="">We may disclose your Personal Information if we feel this is necessary in
                            order to protect
                            or defend our legitimate rights and interests, or those of our users and/or to ensure the safety
                            and security of the COMM App.
                        </h5>

                        <h2 className="title" style={{color: 'black'}}>Other Information We May Collect</h2>

                        <h5 className="">We may also collect any information that does not reveal your specific
                            identity or does not
                            directly relate to an individual, such as browser information, information collected through
                            cookies, pixel tags and other technologies, demographic information, other information provided
                            by you, and aggregated information (“Other Information”).
                        </h5>

                        <h2 className="title" style={{color: 'black'}}>How User-Generated Content Is Used</h2>
                        <h5 className="">The user-generated content that COMM App collects are video responses to
                            Impromptu Speech Questions (“ISQ”). COMM App will save these videos until they are reviewed and
                            critiqued. Once this is accomplished, the user-generated content (i.e. ISQ response) is deleted
                            permanently. COMM App will not use or share user-generated content for any other purpose beyond
                            providing critique. User-generated content will not be shared with any third party.</h5>

                        <h2 className="title" style={{color: 'black'}}>Contact Us</h2>

                        <h5 className="">Any questions, concerns or comments regarding this policy can be directed to <a className="text-info" href="mailto:commappmvp@gmail.com">commappmvp@gmail.com.</a></h5>




                    </div>
                </div>

                




            </AuxWrapper>
        )

    }

}


export default TermsOfUse


