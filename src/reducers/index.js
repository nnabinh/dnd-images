import * as _ from 'lodash';

import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES, MOVE_IMAGE } from '../constants';

// Load 17 paris images to test
const loadAllParisImage = () => [...Array(17).keys()].map(i => {
    return {
	id: Math.random(),
	src: require(`../img/paris/paris${i}.jpeg`),
    }
});

// Set dimensions
const setImageDimensions = (dimensions, images) => {
    const newImgs = [];
    dimensions.forEach(dimension => {
	const image = images.find(img => img.id === dimension.imageId);
	if (image) {
	    newImgs.push(_.assign({}, image, {
		width: dimension.width,
		height: dimension.height
	    }));
	}
    });
    return newImgs;
}

// Arrange images into nCols with min difference
const arrangeImages = (nCols, images) => {
    const cols = [...Array(nCols).keys()].map(() => []);
    images = _.orderBy(images, image => image.height, 'desc');
    // Arrange
    for (const image of images) {
	let minCol = cols[0];
	for (const col of cols) {
	    if (_.sumBy(col, img => img.height) < _.sumBy(minCol, img => img.height)) {
		minCol = col;
	    }
	}
	minCol.push(image);
    };
    console.log('Cols in arrange', cols);
    // Randomize
    cols.forEach(col => col.sort((a, b) => a.id > b.id ? 1 : -1));
    // Merge after positioning
    const mergesResult = [...Array(images.length).keys()].map(() => { return {}; });
    cols.forEach((col, colI) => col.forEach((img, imgI) => {
	mergesResult[colI + imgI*nCols] = img;
    }));
    return mergesResult;
};

// Move image
const moveImage = (state, fromFolder, toFolder, imageId) => {
    const preStateFromFolder = _.last(state)[fromFolder];
    const preStateToFolder = _.last(state)[toFolder];
    const image = preStateFromFolder.find(img => img.id.toString() === imageId);
    return {
	[fromFolder]: _.filter(preStateFromFolder, img => img.id.toString() !== imageId),
	[toFolder]: _.concat(preStateToFolder || [], image)
    };
}


// Reducer handling
const images = (state = [], action) => {
    const { folder, type, images } = action;
    switch (type) {
    case LOAD_ALL_PARIS_IMAGES:
	console.log('Load image');
	console.log([...state, _.assign(_.last(state), {
	    [folder]: loadAllParisImage()
	})]);
	return [...state, _.assign({}, _.last(state), {
	    [folder]: loadAllParisImage()
	})];
    case SET_IMAGE_DIMENSIONS:
	const { dimensions } = action;
	console.log('Set image dimensions');
	return [...state, _.assign({}, _.last(state), {
	    [folder]: setImageDimensions(dimensions, images) 
	})];
    case ARRANGE_IMAGES:
	console.log('Arrange images');
	const { nCols } = action;
	return [...state, _.assign({}, _.last(state), {
	    [folder]: arrangeImages(nCols, images)
	})];
    case MOVE_IMAGE:
	const { fromFolder, toFolder, imageId } = action;
	console.log('Move image');
	if (fromFolder === toFolder) {
	    return state;
	}
	return [...state, moveImage(state, fromFolder, toFolder, imageId)];
    default:
	console.log('Default state');
	return state;
    }
}

export default images;
