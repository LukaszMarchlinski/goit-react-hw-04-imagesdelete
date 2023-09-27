import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
    render() {
        const { loadMoreButton, titleButton } = this.props;

        return (
            <button className={css.buttonLoadMore} type="submit" onClick={loadMoreButton}>{titleButton}</button>
        );
    }
};

Button.propTypes = {
    loadMoreButton: PropTypes.func.isRequired,
};

export default Button

