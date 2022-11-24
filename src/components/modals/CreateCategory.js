import React from 'react';
import {Box, Button, Checkbox, DialogActions, styled, Typography} from '@mui/material';
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

const CreateCategory = ({ onCategoryCreation }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido.'),
        quota: Yup.number().required('Cupo es requerido').positive('Cupo debe ser positivo').integer(),
        fraction: Yup.number().required('Fraccion es requerida').positive('Fraccion debe ser positivo').integer(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onBlur',
        shouldUnregister: false,
        resolver: yupResolver(validationSchema),
    });

    const handleCategoryCreation = async(values) => {
        try {
            const { data } = await httpClient.post(apiUrls.categories.create, values)

            if (data) {
                onCategoryCreation();
            }
        } catch (e) {
            notifiyErrors(e)
        }
    };


    return (
        <StyledContainer>
            <form onSubmit={handleSubmit(handleCategoryCreation)}>
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
                        {isSubmitting ? 'Creando..' : 'Crear'}
                    </Button>
                </DialogActions>
            </form>
        </StyledContainer>
    );
};

export default CreateCategory;
