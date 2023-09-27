import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, onClick }) => {
    return (
        images.map(image => (
            <li key={image.id} className={css.galleryItem}>
                <img
                    className={css.galleryItemImage}
                    src={image.webformatURL}
                    alt={image.type}
                    data-src={image.largeImageURL}
                    onClick={onClick} />
            </li>
        ))
    );
};

ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem