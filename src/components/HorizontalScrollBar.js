import { Box, Typography } from "@mui/material";
import BodyPart from "./BodyPart";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
  
const SwipeToSeeMore = () => {
    return (
      <Typography className="swipe-to-see-more">
        <p>Swipe to see more </p>
      </Typography>
    );
};

const HorizontalScrollbar = ({data, bodyParts}) => {
    return(
        <ScrollMenu RightArrow={SwipeToSeeMore}>
            <div className="xyz">
                {data?.map((item) => {
                    return(<Box key={item.id || item} itemId={item.id || item} title={item.id || item}>
                        {bodyParts ? <BodyPart item={item} /> : ''}
                    </Box>)
                })}
            </div>
            
        </ScrollMenu>
    );
};

export default HorizontalScrollbar;