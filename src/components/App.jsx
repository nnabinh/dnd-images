import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import Folder from './folder';
import './App.css';

class App extends Component {
    render() {
	return (
	    <div>
		<div className="title">
		    Welcome to DnD Images
		</div>
		<Col sm={6} md={1}/>
		<Col sm={6} md={5}>
		    <Folder name="FOLDER 1"/>
		</Col>
		<Col sm={6} md={5}>
		    <Folder name="FOLDER 2"/>
		</Col>
		<Col sm={6} md={1}/>
	    </div>
	);
    }
}

export default App;
