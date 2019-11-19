import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Form as UnForm, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { ContentHeader, ContentWrapper, Button } from '~/components';
import { Container, InputContainer } from './styles';
import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({
    title: Yup.string().required('Campo obrigatório'),
    duration: Yup.number()
        .typeError('Valor numérico obrigatório')
        .required('Campo obrigatório'),
    price: Yup.number()
        .typeError('Valor numérico obrigatório')
        .required('Campo obrigatório'),
});

export default function Plan() {
    const { plan_id } = useParams();
    const [plan, setPlan] = useState({});
    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const [, setTotal] = useState(0);

    useEffect(() => {
        async function loadPlan() {
            if (plan_id) {
                const response = await api.get(`plans/${plan_id}`);
                const {
                    duration: drt,
                    price: prc,
                    total_price,
                } = response.data;

                setDuration(drt);
                setPrice(prc);
                setTotal(total_price);
                setPlan(response.data);
            }
        }

        loadPlan();
    }, [plan_id]);

    const formattedTotal = useMemo(() => {
        return formatPrice(duration * price);
    }, [duration, price]);

    async function handleSave(data) {
        try {
            if (plan_id) {
                await api.put(`plans/${plan_id}`, data);
                toast.success('Plano atualizado com sucesso!');
            } else {
                await api.post(`plans/${plan_id}`, data);
                toast.success('Plano cadastrado com sucesso!');
            }

            history.push('/plan/list');
        } catch (error) {
            console.tron.error(error);
            toast.error(
                'Falha ao salvar registro. Por favor, verifique seus dados!'
            );
        }
    }

    return (
        <Container>
            <ContentHeader
                title={plan_id ? 'Edição de plano' : 'Cadastro de plano'}
            >
                <Button
                    text="Voltar"
                    buttonType={Button.TYPES.Back}
                    onClick={() => history.push('/plan/list')}
                />
                <Button
                    type="submit"
                    form="plan"
                    text="Salvar"
                    buttonType={Button.TYPES.Save}
                />
            </ContentHeader>
            <ContentWrapper>
                <UnForm
                    id="plan"
                    schema={schema}
                    initialData={plan}
                    onSubmit={handleSave}
                >
                    <label htmlFor="title">Título do plano</label>
                    <Input id="title" name="title" />
                    <div>
                        <InputContainer>
                            <label htmlFor="duration">Duração(Mêses)</label>
                            <Input
                                id="duration"
                                name="duration"
                                onChange={e => setDuration(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor="price">Preço mensal</label>
                            <Input
                                id="price"
                                name="price"
                                onChange={e => setPrice(e.target.value)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor="total_price">Preço total</label>
                            <Input
                                id="total_price"
                                name="total_price"
                                value={formattedTotal}
                                disabled
                            />
                        </InputContainer>
                    </div>
                </UnForm>
            </ContentWrapper>
        </Container>
    );
}
