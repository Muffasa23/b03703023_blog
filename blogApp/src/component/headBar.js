import React, { Component } from 'react';

export default class HeadBar extends Component{
    
    render(){
    
        return(
            <div className="header">
                <div className="wrap">
                    <div className="titleArea">
                        <h1 className="title">
                            Blog
                        </h1>
                    </div>

                    <nav>
                        <ul className="menu">
                            <li><a>Home</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
