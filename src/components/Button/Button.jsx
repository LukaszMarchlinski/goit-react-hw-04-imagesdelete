import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ loadMoreButton, titleButton }) => {
    return (
        <button className={css.buttonLoadMore} type="submit" onClick={loadMoreButton}>{titleButton}</button>
    );
};

Button.propTypes = {
    loadMoreButton: PropTypes.func.isRequired,
};

export default Button