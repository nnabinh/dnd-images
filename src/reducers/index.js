import * as _ from 'lodash';

import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES, MOVE_IMAGE } from '../constants';

// Load 17 paris images to test
const loadAllParisImage = () => [...Array(17).keys()].map(i => {
    return {
	id: Math.random(),
	src: require(`../img/paris/paris${i}.jpeg`),
    }
});

// Arrange images into nCols with min difference
const arrangeImages = (nCols, images) => {
    const cols = [...Array(nCols).keys()].map(() => []);
    images.sort((a, b) => a.height > b.height ? -1 : 1);
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
    // Randomize
    cols.forEach(col => col.sort((a, b) => a.id > b.id ? 1 : -1));
    // Merge after positioning
    const mergesResult = [...Array(images.length).keys()].map(() => { return {}; });
    cols.forEach((col, colI) => col.forEach((img, imgI) => {
	mergesResult[colI + imgI*nCols] = img;
    }));
    return mergesResult;
};

// Reducer handling
const images = (state = {}, action) => {
    const { folder, type, images } = action;
    switch (type) {
    case LOAD_ALL_PARIS_IMAGES:
	console.log('Load image');
	state[folder] = loadAllParisImage();
	return state;
    case SET_IMAGE_DIMENSIONS:
	const { dimensions } = action;
	console.log('Set image dimensions');
	dimensions.forEach(dimension => {
	    const image = images.find(img => img.id === dimension.imageId);
	    if (image) {
		image.width = dimension.width;
		image.height = dimension.height;
	    }
	});
	return state;
    case ARRANGE_IMAGES:
	const { nCols } = action;
	console.log('Arrange images');
	state[folder] = arrangeImages(nCols, images);
	console.log(state);
	return state;
    case MOVE_IMAGE:
	const { fromFolder, toFolder, imageId } = action;
	console.log('Move image');
	console.log('State before moving', state);
	if (fromFolder === toFolder) {
	    return state;
	}
	const image = state[fromFolder].find(img => img.id.toString() === imageId);
	(state[toFolder] || (state[toFolder] = [])).push(image);
	state[fromFolder] =  _.filter(state[fromFolder], img => img.id.toString() !== imageId)
	console.log('State after moving', state);
	console.log('From folder: ', state[fromFolder]);
	console.log('To folder: ', state[toFolder]);
	return {
	    [fromFolder]: state[fromFolder],
	    [toFolder]: state[toFolder]
	};
    default:
	console.log('Default state');
	return state;
    }
}

export default images;
