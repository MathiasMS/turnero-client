import React from 'react'

import { Box } from '@mui/material';
import CustomAccordion from './CustomAccordion';

const Calendar = ({ calendar, selectedDays, handleSelectDays, isEdit = false}) => {
    const onHourSelect = (day, hour) => {
        handleSelectDays(day, hour)
    }

    return (
        <Box sx={{ mt: 2}}>
            {
                calendar.map(c => (
                    <CustomAccordion content={c} isEdit={isEdit} handleHourSelect={onHourSelect} selectedDays={selectedDays} />
                ))
            }
        </Box>
    );
}

export default Calendar
