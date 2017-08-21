import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES, MOVE_IMAGE } from '../constants';

export const loadALlParisImages = (folder, nCols) => {
    return {
	type: LOAD_ALL_PARIS_IMAGES,
	folder,
	nCols
    };
}

export const setImageDimensions = (folder, cols, dimensions) => {
    return {
	type: SET_IMAGE_DIMENSIONS,
	folder,
	cols,
	dimensions
    }
}

export const arrangeImages = (folder, cols) => {
    return {
	type: ARRANGE_IMAGES,
	folder,
	cols
    }
}

export const moveImage = (fromFolder, toFolder, toColIndex, imageId, nCols) => {
    return {
	type: MOVE_IMAGE,
	fromFolder,
	toFolder,
	toColIndex,
	imageId,
	nCols
    }
}
