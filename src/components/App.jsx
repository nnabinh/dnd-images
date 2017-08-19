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
		<Col md={1}/>
		<Col md={5}>
		    <Folder id="folder1"/>
		</Col>
		<Col md={5}>
		    <Folder id="folder2"/>
		</Col>
		<Col md={1}/>
	    </div>
	);
    }
}

export default App;
