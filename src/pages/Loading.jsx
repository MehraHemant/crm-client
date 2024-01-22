import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Box sx={{display: 'grid', height:'100vh', placeContent:"center"}}>
        <CircularProgress/>
    </Box>
  )
}

export default Loading