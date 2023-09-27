import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmitInput }) => {
    const [query, setQuery] = useState('');
    
    const onInputChange = e => {
        setQuery(e.target.value.trim());
    };

    const onSubmitForm = e => {
        e.preventDefault();
        if (query.length === 0) {
            alert("Pole wyszukiwania nie może być puste")
        } else {
            onSubmitInput(query);
            setQuery('');
        }
    };

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
};

Searchbar.propTypes = {
    onSubmitInput: PropTypes.func.isRequired,
};

export default Searchbar;