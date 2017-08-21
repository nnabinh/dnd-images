import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { loadALlParisImages, setImageDimensions, arrangeImages, moveImage } from '../../actions';
import { folderName } from '../../constants';
import './index.css';

class Folder extends Component {
    dimensions = [];
    nCols = 3;
    isDimensionsSet = false;

    constructor(props) {
	super(props);
	// Init images only in folder 1
	if (this.props.id === 'folder1') {
	    this.props.loadALlParisImages('folder1', this.nCols);
	}
    }

    onImgLoad(image) {
	const { id, folder } = this.props;
	const nImages = _.flatten(_.last(folder)[id]).length;
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
		    _.last(folder)[id],
		    this.dimensions
		);
	    }
	}
    }

    renderImages(imgs) {
	return (
	    imgs.map(img => {
		this.onImgLoad(img);
		return (
		    <img
			alt=""
			key={img.id}
			id={img.id}
			src={img.src}
			draggable="true"
			onDragStart={this.startDragImage}
			onDrop={this.preventDefault}
		    />
		)
	    })
	);
    }

    renderColumn() {
	const { id, folder } = this.props;
	const curFolder = _.last(folder);
	return (
	    [...Array(this.nCols).keys()].map((col) => {
		console.log('rendering col for folder', id);
		return (
		    <Col
			md={12/this.nCols}
			key={Math.random()}
			className="folder-col"
			onDrop={event => this.dropOnFolder(event)}>
			{curFolder && curFolder[id] ? this.renderImages(curFolder[id][col]) : ''}
		    </Col>
		);
	    })
	)
    }

    isArranged = false;
    componentDidUpdate() {
	const { id, folder } = this.props;
	if (_.last(folder)) {
	    // hard coded arrange only folder1 for test purpose
	    if (this.isDimensionsSet && !this.isArranged && _.last(folder)[id] && id === 'folder1') {
		this.isArranged = true;
		this.props.arrangeImages(id, _.last(folder)[id]);
	    }
	    // Below code is for auto rearranging photos inside folder
	    /* const { isArranged } = _.last(folder);
	       if (this.isDimensionsSet && (!isArranged || !isArranged[id]) && _.last(folder)[id]) {
	       this.props.arrangeImages(id, _.last(folder)[id]);
	       }*/
	}
    }

    startDragImage(event) {
	const movingImgId = event.target.id;
	const fromFolderId = event.target.parentNode.parentNode.firstChild.id;
	const data = { movingImgId, fromFolderId };
	event.dataTransfer.setData('text', JSON.stringify(data));
    }

    dropOnFolder(event) {
	event.preventDefault();
	console.log('Drop on x: ', event.clientX);
	console.log('Drop on y: ', event.clientY);
	console.log(event.target);
	console.log(event.target.offsetLeft);
	console.log(event.target.offsetTop);
	const { id } = this.props;
	const colWidth = document.getElementById(id).offsetWidth / this.nCols;
	let toColIndex = 0;
	[...Array(this.nCols + 1).keys()].some(i => {
	    if (event.target.offsetLeft - colWidth * i < 0) {
		console.log(i);
		toColIndex = i - 1;
		return true;
	    }
	    return false;
	});

	console.log('target col index: ', toColIndex);
	const titleEle =
	    event.target.parentNode.firstChild.className === 'folder-title' ?
	    event.target.parentNode.firstChild :
	    event.target.parentNode.parentNode.firstChild;
	const toFolderId = titleEle.id;
	const data = JSON.parse(event.dataTransfer.getData('text'));
	this.props.moveImage(data.fromFolderId, toFolderId, toColIndex, data.movingImgId, this.nCols);
    }

    preventDefault(event) {
	event.preventDefault();
    }

    render() {
	console.log(this.props);
	return (
	    <div
		className="folder"
		onDragOver={this.preventDefault}
		onDrop={this.preventDefault}>
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

export default connect(mapStateToProps, {loadALlParisImages, setImageDimensions, arrangeImages, moveImage})(Folder);
