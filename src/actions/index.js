import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS } from '../constants';

export const loadALlParisImages = (folder) => {
    return {
	type: LOAD_ALL_PARIS_IMAGES,
	folder
    };
}

export const setImageDimensions = (folder, imageId, dimensions, images, isSelected) => {
    return {
	type: SET_IMAGE_DIMENSIONS,
	folder,
	imageId,
	dimensions,
	images
    }
}
