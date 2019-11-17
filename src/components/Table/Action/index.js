import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Action({ onClick, text, color }) {
    return (
        <Container type="button" onClick={onClick} color={color}>
            {text}
        </Container>
    );
}

Action.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};
