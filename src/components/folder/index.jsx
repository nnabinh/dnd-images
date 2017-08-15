import React, { Component } from 'react';

import './index.css';

class Folder extends Component {
    render() {
	return (
	    <div className="folder">
		<div className="folder-title">
		    {this.props.name}
		</div>
	    </div>
	);
    }
}

export default Folder;
