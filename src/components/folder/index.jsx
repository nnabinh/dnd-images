import * as _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import { loadALlParisImages, setImageDimensions, arrangeImages } from '../../actions';
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
	    nCols: 3,
	    isArranged: false,
	    dimensions: []
	};
    }

    onImgLoad(image) {
	console.log('image loading');
	if (!image.isLoaded) {
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
		<Col md={12/this.state.nCols} key={Math.random()} className="folder-col">
		    {this.renderImages(colIndex)}
		</Col>
	    ))
	);
    }

    /* componentDidUpdate() {
       const { id, folder } = this.props;
       const { dimensions } = folder[id][0];
       if (!this.state.isArranged && folder[id].dimensions) {
       console.log(dimensions);
       const { id, folder } = this.props;
       this.setState({ isArranged: true });
       this.props.arrangeImages(this.state.nCols, folder[id]);
       }
     * }*/
    /* componentDidUpdate() {
       const { id, folder } = this.props;
       if (folder[id]) {
       const isLoadeds = _.uniq(folder[id].map(img => img.isLoaded));
       if (isLoadeds.length === 1 && isLoadeds[0] === true) {
       console.log('Last');
       }
       }
     * }*/

    render() {
	console.log(this.props);
	const { id, folder } = this.props;
	if (folder[id]) {
	    console.log(folder[id][0]);
	}
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
