import { Box, Button, Grid, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';
import moment from 'moment/moment';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 400px;
`;

const ConfirmCancel = ({ onClose }) => {
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [confirmedData, setConfirmedData] = useState(null)

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onCancel = async() => {
        try {
            const { data } = await httpClient.post(apiUrls.proceduresAvailability.cancel, {
                number,
                email
            })

            if (data) {
                setConfirmedData(data)
            }
        } catch (e) {
            notifiyErrors(e)
        }
    }

    return (<StyledContainer>
        {
            !confirmedData ? (
                <>
                    <TextField
                        placeholder="Coloque el numero de turno a cancelar."
                        value={number}
                        fullWidth
                        sx={{ mb: 2}}
                        onChange={handleNumberChange}
                    />
                    <TextField
                        placeholder="Coloque el email de turno a cancelar."
                        value={email}
                        type="email"
                        fullWidth
                        onChange={handleEmailChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                        <Box sx={{ display: 'flex', gap: 1, mt: 3}}>
                            <Button variant="outlined" onClick={onClose}>Cerrar</Button>
                            <Button variant="contained" onClick={onCancel} disabled={!number}>Si, Confirmar</Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{
                        fontWeight: '600',
                        fontSize: '15px',
                        lineHeight: '27px',
                        color: 'red'
                    }} mb={3}>
                        Turno cancelado!
                    </Box>
                    <Grid container sx={{ display: 'flex', flexDirection: 'column', color: '#374561', gap: 1, mb: 3}}>
                        <Grid item xs={12}>
                            <span style={{ fontSize: '13px'}}>Se ha cancelado el turno del dia </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{moment(confirmedData.date).format("DD-MM-YYYY")}</span>
                            <span style={{ fontSize: '13px'}}> a las </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{`${confirmedData.hour}hs`}</span>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                        <Box sx={{ display: 'flex', gap: 1, mt: 3}}>
                            <Button variant="outlined" onClick={onClose}>Cerrar</Button>
                        </Box>
                    </Box>
                </>
            )
        }
    </StyledContainer>)
}

export default ConfirmCancel
