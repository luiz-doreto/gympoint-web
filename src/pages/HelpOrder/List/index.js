import React, { useState, useEffect } from 'react';

import { ContentWrapper, ContentHeader, Button, Table } from '~/components';
import api from '~/services/api';

export default function List() {
    const [helpOrders, setHelpOrders] = useState([]);

    useEffect(() => {
        async function loadHelpOrders() {
            const response = await api.get('help-orders');

            setHelpOrders(response.data);
        }

        loadHelpOrders();
    }, []);

    return (
        <div>
            <ContentHeader title="Pedidos de auxílio">
                <Button
                    text="Cadastrar"
                    buttonType={Button.TYPES.Register}
                    onClick={() => alert('tem que fazer')}
                />
            </ContentHeader>
            <ContentWrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {helpOrders.map(ho => (
                            <tr key={ho.id}>
                                <td>{ho.student.name}</td>
                                <td>
                                    <Table.Action
                                        text="responder"
                                        color="#4D85EE"
                                        onClick={() =>
                                            alert('not implemented yet!')
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentWrapper>
        </div>
    );
}
