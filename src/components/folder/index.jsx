import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { loadALlParisImages, setImageDimensions, arrangeImages } from '../../actions';
import { folderName } from '../../constants';
import './index.css';

class Folder extends Component {
    dimensions = [];
    nCols = 3;
    isDimensionsSet = false;
    isArranged = false;

    constructor(props) {
	super(props);
	// Init images only in folder 1
	if (this.props.id === 'folder1') {
	    this.props.loadALlParisImages('folder1');
	}
    }

    onImgLoad(image) {
	const { id, folder } = this.props;
	const nImages = folder[id].length;
	const img = new Image();
	img.src = image.src;
	img.onload = () => {
	    const htmlImages = document.getElementsByTagName('img');
	    const htmlImg = _.find(htmlImages, img => img.id === image.id.toString());
	    this.dimensions.push({
		imageId: image.id,
		height: htmlImg.height,
		width: htmlImg.width
	    })
	    if (this.dimensions.length === nImages && !this.isDimensionsSet) {
		this.isDimensionsSet = true;
		this.props.setImageDimensions(
		    id,
		    folder[id],
		    this.dimensions
		);
	    }
	}
    }

    renderImages(colIndex) {
	const { id, folder } = this.props;
	if (folder[id]) {
	    return folder[id].map((image, index) => {
		if (index % this.nCols === colIndex) {
		    this.onImgLoad(image);
		    return (
			<img alt="" key={image.id} id={image.id} src={image.src}/>
		    );
		}
		return '';
	    });
	}
    }

    renderColumn() {
	return (
	    [...Array(this.nCols).keys()].map((colIndex) => (
		<Col md={12/this.nCols} key={Math.random()} className="folder-col">
		    {this.renderImages(colIndex)}
		</Col>
	    ))
	);
    }

    componentDidUpdate() {
	const { id, folder } = this.props;
	if (this.isDimensionsSet && !this.isArranged && folder[id]) {
	    this.isArranged = true;
	    this.props.arrangeImages(id, this.nCols, folder[id]);
	}
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

export default connect(mapStateToProps, {loadALlParisImages, setImageDimensions, arrangeImages})(Folder);
