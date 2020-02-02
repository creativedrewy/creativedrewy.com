import React, { Component } from 'react';

export class Header extends Component<{}, {}> {
    render() {
        return (
            <header className="header text-center">
                <h1 className="blog-name pt-lg-4 mb-0"><a href="index.html">Anthony's Blog</a></h1>

                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                        aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navigation" className="collapse navbar-collapse flex-column">
                        <div className="profile-section pt-3 pt-lg-0">
                            <img className="profile-image mb-3 rounded-circle mx-auto" src="assets/images/profile.png" alt="image"></img>

                            <div className="bio mb-3">Hi, my name is Anthony Doe. Briefly introduce yourself here. You can also provide a link to the about page.<br /><a href="about.html">Find out more about me</a></div>

                            <ul className="social-list list-inline py-3 mx-auto">
                                <li className="list-inline-item"><a href="#"><i className="fab fa-twitter fa-fw"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-linkedin-in fa-fw"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-github-alt fa-fw"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-stack-overflow fa-fw"></i></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-codepen fa-fw"></i></a></li>
                            </ul>

                            <hr />
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}