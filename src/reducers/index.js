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
const moveImage = (state, action) => {
    const { fromFolder, toFolder, toColIndex, imageId, nCols } = action;
    const newCols = [...Array(nCols).keys()].map(() => []);

    const fromFolderCols = _.last(state)[fromFolder] || newCols;
    console.log(_.last(state));
    console.log(fromFolderCols);
    const toFolderCols = _.last(state)[toFolder] || newCols;
    const image = _.flatten(fromFolderCols).find(img => img.id.toString() === imageId);

    if (fromFolder !== toFolder) {
	// Moving img between dif folders
	return {
	    [fromFolder]: fromFolderCols.map(col => _.filter(col, img => img.id.toString() !== imageId)),
	    [toFolder]: toFolderCols.map((col, colIndex) =>
		colIndex === toColIndex ? [...col, image] : [...col]
	    )
	};
    } else {
	// Moving img in internal folder
	return _.assign({}, _.last(state), {
	    [fromFolder]: fromFolderCols.map((col, colIndex) => {
		const newCol = col.filter(img => img.id.toString() !== imageId);
		if (colIndex === toColIndex) {
		    return [...newCol, image];
		}
		return newCol;
	    })
	});
    }
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
	return [...state, moveImage(state, action)];
    default:
	console.log('Default state');
	return state;
    }
}

export default images;
