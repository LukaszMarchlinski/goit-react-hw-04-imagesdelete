import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.props.closeModalByEscape)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.props.closeModalByEscape)
    }

    render() {
        const { src, alt, closeModalByOverlay } = this.props;

        return (
            <div className={css.overlay} onClick={closeModalByOverlay}>
                <div className={css.modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>
        );
    }
};

Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    closeModalByEscape: PropTypes.func.isRequired,
    closeModalByOverlay: PropTypes.func.isRequired
};

export default Modal