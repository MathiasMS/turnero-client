import React from "react";
import Box from "@mui/material/Box";
import {Button, styled, Typography} from "@mui/material";

const StyledHeaderContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const StyledTitleContainer = styled(Box)`
    display: flex;
    align-items: center;
`;

// Generic Header for pages
const Header = ({
    title,
    actionLabel,
    action,
    color = 'primary',
    actionDisabled = false,
}) => (
    <StyledHeaderContainer>
        <StyledTitleContainer>
            <Typography variant="h5">{title}</Typography>
        </StyledTitleContainer>
        {
            actionLabel && action && (
                <Box>
                    <Button variant="contained" disabled={actionDisabled} color={color} onClick={action}>
                        {actionLabel}
                    </Button>
                </Box>
            )
        }
    </StyledHeaderContainer>
)

export default Header
