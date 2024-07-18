import * as React from 'react';
import { useState, useEffect } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import "./timeline.css";

const  DeliveryTimeline=({timelines})=> {
    const [timeline, setTimeLine]=useState(timelines);
    // const classes = useStyles();
    useEffect(()=>{
        console.log(timelines);
        setTimeLine([...timelines])
    },[timelines])
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto'}}>
      <Timeline sx={{ display: 'flex', flexDirection: 'row', p: 0, m: 0 }}>
        {timeline.map((time, index) => (
            <TimelineItem sx={{ display: 'block', }}>
            <TimelineContent color="textSecondary">
            <Typography>{new Date(time?.at * 1000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
            </TimelineContent>
          <TimelineItem
            key={index}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}
          >
            <TimelineSeparator sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <TimelineDot />
              {index < timeline.length - 1 && (
                <TimelineConnector sx={{ width: 200, height: 2, backgroundColor: 'green' }} />
              )}
            </TimelineSeparator>
          </TimelineItem>
           <TimelineContent>
           <Typography className='text-timeline'>{time?.name}</Typography>
         </TimelineContent></TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
export default DeliveryTimeline;