import React from 'react';

import { Dialog, Button } from '~/components';

// import { Container } from './styles';

export default function AnswerDialog({ visible }) {
    return (
        <Dialog visible={visible}>
            <h2>Pergunta do aluno</h2>
            <span>
                É importante questionar o quanto o julgamento imparcial das
                eventualidades obstaculiza a apreciação da importância do fluxo
                de informações. A certificação de metodologias que nos auxiliam
                a lidar com a consulta aos diversos militantes acarreta um
                processo de reformulação e modernização das diretrizes de
                desenvolvimento para o futuro. Ainda assim, existem dúvidas a
                respeito de como a revolução dos costumes faz parte de um
                processo de gerenciamento do orçamento setorial.
            </span>
            <textarea />
            <Button text="Responder aluno" />
        </Dialog>
    );
}
