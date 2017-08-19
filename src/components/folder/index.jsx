import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { loadALlParisImages, setImageDimensions } from '../../actions';
import { folderName } from '../../constants';
import './index.css';

class Folder extends Component {
    constructor(props) {
	super(props);
	// Init images only in folder 1
	if (this.props.id === 'folder1') {
	    this.props.loadALlParisImages('folder1');
	}

	this.state = {
	    nCols: 3
	};
    }

    onImgLoad(image) {
	const { id, folder } = this.props;
	const img = new Image();
	img.src = image.src;
	img.onload = () => {
	    this.props.setImageDimensions(
		id,
		image.id,
		{
		    height: img.height,
		    width: img.width
		},
		folder[id]
	    );
	}
    }

    componentDidMount() {
	const height = document.getElementById(this.props.id).clientHeight;
	console.log(height);
    }

    renderImages(colIndex) {
	const { id, folder } = this.props;
	if (folder[id]) {
	    return folder[id].map((image, index) => {
		if (index % this.state.nCols === colIndex) {
		    const image = folder[id][index];
		    this.onImgLoad(image);
		    return (
			<img alt="" key={image.id} src={image.src}/>
		    );
		}
		return '';
	    });
	}
    }

    renderColumn() {
	return (
	    [...Array(this.state.nCols).keys()].map((colIndex) => (
		<Col md={4} className="folder-col">
		    {this.renderImages(colIndex)}
		</Col>
	    ))
	);
    }

    render() {
	console.log(this.props);
	return (
	    <div className="folder">
		<div className="folder-title" id={this.props.id}>
		    {folderName[this.props.id]}
		</div>
		{this.renderColumn()}
	    </div>
	);
    }
}

function mapStateToProps(state) {
    return {
	folder: state
    }
}

export default connect(mapStateToProps, {loadALlParisImages, setImageDimensions})(Folder);
