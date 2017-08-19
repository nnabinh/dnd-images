import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS } from '../constants';

const loadAllParisImage = () => [...Array(10).keys()].map(i => {
    return {
	id: Math.random(),
	src: require(`../img/paris/paris${i}.jpeg`),
    }
});

const images = (state = [], action) => {
    const { folder, type } = action;
    switch (type) {
    case LOAD_ALL_PARIS_IMAGES:
	return {
	    [folder]: loadAllParisImage()
	}
    case SET_IMAGE_DIMENSIONS:
	const { imageId, dimensions, images } = action;
	const image = images.find(img => img.id === imageId);
	if (image)  {
	    image.dimensions = dimensions;
	}
	return state;
    default:
	return state;
    }
}

export default images;
