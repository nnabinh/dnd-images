import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES } from '../constants';

export const loadALlParisImages = (folder) => {
    return {
	type: LOAD_ALL_PARIS_IMAGES,
	folder
    };
}

export const setImageDimensions = (folder, imageId, dimensions, images) => {
    return {
	type: SET_IMAGE_DIMENSIONS,
	folder,
	imageId,
	dimensions,
	images
    }
}

export const arrangeImages = (nCols, images) => {
    return {
	type: ARRANGE_IMAGES,
	nCols,
	images
    }
}
