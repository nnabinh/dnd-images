import {
    LOAD_ALL_PARIS_IMAGES,
    SET_IMAGE_DIMENSIONS,
    ARRANGE_IMAGES,
    MOVE_IMAGE_TO_COL,
    MOVE_IMAGE_AFTER_IMAGE
} from '../../constants';

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

export const moveImageToCol = (fromFolder, toFolder, toColIndex, imageId, nCols) => {
    return {
	type: MOVE_IMAGE_TO_COL,
	fromFolder,
	toFolder,
	toColIndex,
	imageId,
	nCols
    }
}

export const moveImageAfterImage = (fromFolder, toFolder, afterImgId, imageId, nCols) => {
    return {
	type: MOVE_IMAGE_AFTER_IMAGE,
	fromFolder,
	toFolder,
	afterImgId,
	imageId,
	nCols
    }
}
