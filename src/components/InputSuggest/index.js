import React, { useState, useRef, useEffect } from 'react';
import AutoSuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import './style.css';

export default function InputSuggest({
    name,
    fieldProp,
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    inputProps,
}) {
    const ref = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.dataset',
        });
    }, [ref.current]); // eslint-disable-line

    function renderSuggestion(suggestion) {
        return <div>{suggestion[fieldProp]}</div>;
    }

    function handleGetSuggestionValue(suggestion) {
        setValue(suggestion);
        return suggestion[fieldProp];
    }

    return (
        <>
            <AutoSuggest
                ref={ref}
                name={fieldName}
                dataset={value}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={handleGetSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
            {error && <span>{error}</span>}
        </>
    );
}

InputSuggest.propTypes = {
    name: PropTypes.string.isRequired,
    fieldProp: PropTypes.string.isRequired,
    suggestions: PropTypes.array.isRequired, // eslint-disable-line
    onSuggestionsFetchRequested: PropTypes.func.isRequired,
    onSuggestionsClearRequested: PropTypes.func.isRequired,
    inputProps: PropTypes.shape({}).isRequired,
};
