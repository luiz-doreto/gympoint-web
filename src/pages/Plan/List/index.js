import React from 'react';

import { Container } from './styles';
import ContentWrapper from '~/components/ContentWrapper';
import ContentHeader from '~/components/ContentHeader';
import Button from '~/components/Button';

export default function List() {
    return (
        <Container>
            <ContentHeader title="Gerenciando planos">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => alert('tem que fazer')}
                />
            </ContentHeader>
            <ContentWrapper>
                <strong>OI</strong>
            </ContentWrapper>
        </Container>
    );
}
