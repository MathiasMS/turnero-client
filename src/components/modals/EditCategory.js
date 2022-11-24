import React, { useEffect, useState } from 'react';
import {Box, Button, DialogActions, styled, CircularProgress} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFormField from '../form/TextFormField';
import NumberFormField from '../form/NumberFormField';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 350px;
`;

const EditCategory = ({ categoryId, onCategoryEdition }) => {
    const [loading, setLoading] = useState({})

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido.'),
        quota: Yup.number().required('Cupo es requerido').positive('Cupo debe ser positivo').integer(),
        fraction: Yup.number().required('Fraccion es requerida').positive('Fraccion debe ser positivo').integer(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
    });

    const getCategory = async() => {
        try {
            const { data } = await httpClient.get(apiUrls.categories.getOne(categoryId))

            if (data) {
                reset(data)
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryEdition = async(values) => {
        try {
            const { data } = await httpClient.put(apiUrls.categories.edit(categoryId), values)

            if (data) {
                onCategoryEdition();
            }
        } catch (e) {
            notifiyErrors(e)
        }
    };

    useEffect(() => {
        getCategory()
    }, [reset, categoryId])

    if (loading) {
        return (
            <StyledContainer>
                <Box sx={{ height: '258px', width: '350px'}}>
                    <CircularProgress />
                </Box>
            </StyledContainer>
        )
    }

    return (
        <StyledContainer>
            <form onSubmit={handleSubmit(handleCategoryEdition)}>
                <Box>
                    <TextFormField
                        name="name"
                        control={control}
                        label="Nombre"
                        errors={errors.name}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: '15px'}}>
                    <NumberFormField
                        name="quota"
                        control={control}
                        label="Cupo"
                        errors={errors.quota}
                    />
                    <NumberFormField
                        name="fraction"
                        control={control}
                        label="Fraccion"
                        errors={errors.fraction}
                    />
                </Box>
                <DialogActions>
                    <Button variant="contained" disabled={isSubmitting} type="submit">
                        {isSubmitting ? 'Editando..' : 'Editar'}
                    </Button>
                </DialogActions>
            </form>
        </StyledContainer>
    );
};

export default EditCategory;
