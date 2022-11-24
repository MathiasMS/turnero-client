import { v4 as uuidv4 } from 'uuid';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Grid, Box} from '@mui/material';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import React, { useState } from 'react';

const editSx = {
    pointerEvents: 'none',
    opacity: '0.5',
    background: '#ebe7e7'
}

const CustomAccordion = ({ content, handleHourSelect, isEdit, selectedDays}) => {
    const [expanded, setExpanded] = useState(true)

    const onChange = (event, expanded) => {
        setExpanded(expanded)
    }

    return (
        <Accordion expanded={expanded} onChange={onChange} key={uuidv4()}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={content.formattedDay}
                id={content.formattedDay}
            >
                <Typography>{content.formattedDay}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={isEdit ? editSx : {}}>
                <Grid container spacing={1}>
                    {
                        content.hours.map(hour => {
                            const isHourSelected = selectedDays[content.day] ? selectedDays[content.day].find(x => x === hour) : false

                            return <Grid key={uuidv4()} item xs={12} md={1}><Button sx={{width: '70px'}} variant={isHourSelected ? 'contained' : 'outlined'} onClick={() => handleHourSelect(content.day, hour)}>{hour}</Button></Grid>
                        })
                    }
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default CustomAccordion
