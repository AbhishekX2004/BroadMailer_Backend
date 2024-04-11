import React from "react";

function Footer() {
    return (
        <footer className="page-footer" style={{backgroundColor: "skyblue"}}>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">BroadMailer</h5>
                        <p className="grey-text text-lighten-4">
                            Send mails to anyone, anywhere!!
                            Using our Credit based Bulk mailer.

                        </p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Goto</h5>
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="/">Home</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © {new Date().getFullYear()} By - Abhishek Verma
                    <a className="grey-text text-lighten-4 right" href="/">More Links</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;