import React, { useState } from 'react'
import { Box, styled, Grid, Button, CircularProgress, TextField } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es'
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';  // without this line it didn't work
moment.locale('es')

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 400px;
`;


const ConfirmAppointment = ({ procedure, onSuccess, date, hour, onClose}) => {
    const [confirmedData, setConfirmedData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const currentDate = moment(date).startOf("day").format("LL")

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onConfirm = async() => {
        try {
            setLoading(true)
            const { data } = await httpClient.post(apiUrls.proceduresAvailability.confirm, {
                date,
                hour,
                email,
                procedureId: procedure[0].id
            })

            if (data) {
                setConfirmedData(data)
                onSuccess()
            }
        } catch (e) {
            notifiyErrors(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <StyledContainer>
            {
                loading ? <Box sx={{ display: 'flex', height: '156px', justifyContent: 'center', alignItems: 'center'}}><CircularProgress /></Box> : (
                    !confirmedData ? (
                        <>
                            <Box sx={{
                                fontWeight: '600',
                                fontSize: '15px',
                                lineHeight: '27px',
                                color: '#374561'
                            }} mb={3}>
                                ¿Estas seguro que queres confirmar este turno?
                            </Box>
                            <Grid container sx={{ display: 'flex', flexDirection: 'column', color: '#374561', gap: 1, mb: 3}}>
                                <Grid item xs={12}>
                                    <span style={{ fontSize: '13px'}}>Tramite: </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{procedure[0] ? procedure[0].name : ''}</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span style={{ fontSize: '13px'}}>Fecha: </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{`${currentDate} - ${hour}`}</span>
                                </Grid>
                            </Grid>
                            <Grid container mb={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Para confirmar el turno coloque un email valido."
                                        type="email"
                                        value={email}
                                        fullWidth
                                        onChange={handleEmailChange}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="outlined" onClick={onClose}>Cancelar</Button>
                                    <Button variant="contained" onClick={onConfirm} disabled={!email}>Si, Confirmar</Button>
                                </Box>
                            </Box>
                        </>
                    ) : <>
                        <Box sx={{
                            fontWeight: '600',
                            fontSize: '15px',
                            lineHeight: '27px',
                            color: '#374561'
                        }} mb={3}>
                            Turno confirmado!
                        </Box>
                        <Grid container sx={{ display: 'flex', flexDirection: 'column', color: '#374561', gap: 1, mb: 3}}>
                            <Grid item xs={12}>
                                <span style={{ fontSize: '13px'}}>Se ha registrado el turno el dia </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{moment(confirmedData.date).format("DD-MM-YYYY")}</span>
                                <span style={{ fontSize: '13px'}}> a las </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{`${confirmedData.hour}hs`}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{ fontSize: '13px'}}>Numbero de turno: </span><span style={{ fontWeight: 'bold', fontSize: '15px'}}>{`#${confirmedData.appointmentNumber}`}</span>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'end'}}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" onClick={onClose}>Cerrar</Button>
                                {/*<Button variant="contained" onClick={onConfirm} disabled={!email}>Si, Confirmar</Button>*/}
                            </Box>
                        </Box>
                    </>
                )
            }
        </StyledContainer>
    )
}

export default ConfirmAppointment
