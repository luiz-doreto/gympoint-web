import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdDone, MdChevronLeft } from 'react-icons/md';

import { Container } from './styles';
import ButtonTypes from './constants';

function Button({ onClick, text, buttonType }) {
    function renderIcon() {
        switch (buttonType) {
            case ButtonTypes.Register:
                return <MdAdd size={20} color="#fff" />;
            case ButtonTypes.Save:
                return <MdDone size={20} color="#fff" />;
            case ButtonTypes.Back:
                return <MdChevronLeft size={20} color="#fff" />;
            default:
                return null;
        }
    }

    return (
        <Container type="button" onClick={onClick} buttonType={buttonType}>
            <div>
                {buttonType && <div>{renderIcon()}</div>}
                <strong>{text}</strong>
            </div>
        </Container>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    buttonType: PropTypes.string,
};

Button.defaultProps = {
    buttonType: null,
};

Button.TYPES = ButtonTypes;

export default Button;
