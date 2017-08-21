import * as _ from 'lodash';

import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES, MOVE_IMAGE } from '../constants';

const assignImgsToCols = (nCols, imgs) => {
    const cols = [...Array(nCols).keys()].map(() => []);
    cols.forEach((col, colIndex) => {
	imgs.forEach((img, imgIndex) => {
	    if (imgIndex % nCols === colIndex) {
		col.push(img);
	    }
	});
    });
    return cols;
}

// Load 17 paris images to test
const loadAllParisImage = (nCols) => {
    const imgs = [...Array(17).keys()].map(i => {
	return {
	    id: Math.random(),
	    src: require(`../img/paris/paris${i}.jpeg`)
	}
    });
    return assignImgsToCols(nCols, imgs);
};

// Set dimensions
const setImageDimensions = (dimensions, cols) => {
    const newCols = [...Array(cols.length).keys()].map(() => []);
    cols.forEach((col, colIndex) => {
	col.forEach(img => {
	    const dimension = dimensions.find(dimension => img.id === dimension.imageId);
	    if (dimension) {
		newCols[colIndex].push(_.assign({}, img, {
		    width: dimension.width,
		    height: dimension.height
		}));
	    }
	})
    })
    return newCols;
}

// Arrange images into nCols with min difference
const arrangeImages = (cols) => {
    const newCols = [...Array(cols.length).keys()].map(() => []);
    const images = _.orderBy(_.flatten(cols), image => image.height, 'desc');
    // Arrange
    for (const image of images) {
	let minCol = newCols[0];
	for (const col of newCols) {
	    if (_.sumBy(col, img => img.height) < _.sumBy(minCol, img => img.height)) {
		minCol = col;
	    }
	}
	minCol.push(image);
    };
    // Randomize
    newCols.forEach(col => col.sort((a, b) => a.id > b.id ? 1 : -1));
    // Merge after positioning
    return newCols;
};

// Move image
const moveImage = (state, fromFolder, toFolder, imageId, nCols) => {
    const preStateFromFolder = _.flatten(_.last(state)[fromFolder]);
    const preStateToFolder = _.flatten(_.last(state)[toFolder]);
    const image = preStateFromFolder.find(img => img.id.toString() === imageId);
    return {
	[fromFolder]: _.last(state)[fromFolder].map(col => _.filter(col, img => img.id.toString() !== imageId)),
	[toFolder]: assignImgsToCols(
	    nCols,
	    _.concat(preStateToFolder || [], image)
	)
    };
}


// Reducer handling
const images = (state = [], action) => {
    const { folder, type, cols, nCols } = action;
    switch (type) {
    case LOAD_ALL_PARIS_IMAGES:
	console.log('Load image');
	return [...state, _.assign({}, _.last(state), {
	    [folder]: loadAllParisImage(nCols)
	})];
    case SET_IMAGE_DIMENSIONS:
	console.log('Set image dimensions');
	const { dimensions } = action;
	return [...state, _.assign({}, _.last(state), {
	    [folder]: setImageDimensions(dimensions, cols) 
	})];
    case ARRANGE_IMAGES:
	console.log('Arrange images');
	const preState = _.last(state);
	const isArranged = _.assign({}, preState.isArranged, {
	    [folder]: true
	})
	return [...state, _.assign({}, preState, {
	    [folder]: arrangeImages(cols),
	    isArranged
	})];
    case MOVE_IMAGE:
	console.log('Move image');
	const { fromFolder, toFolder, imageId } = action;
	if (fromFolder === toFolder) {
	    return state;
	}
	return [...state, moveImage(state, fromFolder, toFolder, imageId, nCols)];
    default:
	console.log('Default state');
	return state;
    }
}

export default images;
