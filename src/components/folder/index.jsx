import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadALlParisImages } from '../../actions';
import { folderName } from '../../constants';
import './index.css';

class Folder extends Component {
    constructor(props) {
	super(props);
	/* this.state = {
	   dimensions: {
	   height: 0,
	   width: 0
	   }
	   };
	   this.onImgLoad = this.onImgLoad.bind(this);*/
	// Init images only in folder 1
	if (this.props.id === 'folder1') {
	    this.props.loadALlParisImages('folder1');
	}
    }

    onImgLoad({target: img}) {
	const { id, folder } = this.props;
	this.props.setDimensions(
	    id,
	    img.id,
	    {
		height: img.offsetHeight,
		width: img.offsetWidth
	    },
	    folder[id]
	);
    }

    loadImages() {
	const { id, folder } = this.props;
	if (folder[id]) {
	    return folder[id].map(image => (
		<img alt="" key={image.id} id={image.id} onLoad={this.onImgLoad} src={image.src}/>
	    ));
	}
    }
    
    render() {
	console.log(this.props);
	return (
	    <div className="folder">
		<div className="folder-title">
		    {folderName[this.props.id]}
		</div>
		{this.loadImages()}
	    </div>
	);
    }
}

function mapStateToProps(state) {
    return {
	folder: state
    }
}

export default connect(mapStateToProps, {loadALlParisImages})(Folder);
