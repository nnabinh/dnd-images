import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES } from '../constants';

export const loadALlParisImages = (folder) => {
    return {
	type: LOAD_ALL_PARIS_IMAGES,
	folder
    };
}

export const setImageDimensions = (folder, images, dimensions) => {
    return {
	type: SET_IMAGE_DIMENSIONS,
	folder,
	images,
	dimensions
    }
}

export const arrangeImages = (folder, nCols, images) => {
    return {
	type: ARRANGE_IMAGES,
	folder,
	nCols,
	images
    }
}
