import React, { Component } from 'react';

export class Header extends Component<{}, {}> {
    //https://uxwing.com/tiktok-icon/

    render() {
        return (
            <header className="header text-center">
                <h1 className="blog-name pt-lg-4 mb-0"><a href="index.html">&#123;creative:drewy&#125;</a></h1>

                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                        aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navigation" className="collapse navbar-collapse flex-column">
                        <div className="profile-section pt-3 pt-lg-0">
                            <img className="profile-image mb-3 rounded-circle mx-auto" src="http://1.gravatar.com/avatar/a1d5c5255be43478b9ac67b43a9a0853?s=720" alt="image"></img>

                            <div className="bio mb-3">Nerdiness, 90s references, and not nearly as much humor as I think there is.<br /></div>

                            <ul className="social-list list-inline py-3 mx-auto">
                                <li className="list-inline-item">
                                    <a href="https://twitter.com/creativedrewy/" target="_blank"><i className="fab fa-twitter fa-fw"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://github.com/creativedrewy/" target="_blank"><i className="fab fa-github-alt fa-fw"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/creativedrewy/" target="_blank"><i className="fab fa-linkedin-in fa-fw"></i></a>
                                </li>
                            </ul>

                            <hr />
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}