import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        query: '',
    };
    
    onInputChange = e => {
        this.setState({ query: e.target.value.trim() });
    };

    onSubmitForm = e => {
        e.preventDefault();
        const { onSubmitInput } = this.props;
        const { query } = this.state;
        if (query.length === 0) {
            alert("Pole wyszukiwania nie może być puste")
        } else {
            onSubmitInput(query);
            this.setState({ query: "" });

        }
    };

    render() {
        const onInputChange = this.onInputChange;
        const onSubmitForm = this.onSubmitForm;

        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={onSubmitForm}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={onInputChange}
                    />
                </form>
            </header>
        );
    }
};

Searchbar.propTypes = {
    onSubmitInput: PropTypes.func.isRequired,
};

export default Searchbar