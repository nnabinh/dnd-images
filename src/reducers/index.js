import { LOAD_ALL_PARIS_IMAGES, SET_IMAGE_DIMENSIONS, ARRANGE_IMAGES } from '../constants';

const loadAllParisImage = () => [...Array(17).keys()].map(i => {
    return {
	id: Math.random(),
	src: require(`../img/paris/paris${i}.jpeg`),
    }
});

const arrangeImages = (nCols, images) => {
    console.log('num of columns', nCols);
    console.log('num of images', images.length);
    const cols = [...Array(nCols).keys()].map(() => []);
    console.log(images.sort((a, b) => {
	console.log(a);
	console.log(b);
	console.log(a.dimensions);
	console.log('-----');
    }));
};
		       
const images = (state = [], action) => {
    const { folder, type, images } = action;
    switch (type) {
    case LOAD_ALL_PARIS_IMAGES:
	return {
	    [folder]: loadAllParisImage()
	}
    case SET_IMAGE_DIMENSIONS:
	const { imageId, dimensions } = action;
	const image = images.find(img => img.id === imageId);
	if (image && !image.isLoaded)  {
	    image.dimensions = dimensions;
	    image.isLoaded = true;
	}
	return state;
    case ARRANGE_IMAGES:
	const { nCols } = action;
	arrangeImages(nCols, images)
	return state;
    default:
	return state;
    }
}

export default images;
