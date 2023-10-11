import { Box, Typography } from "@mui/material";
import BodyPart from "./BodyPart";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Loader from "./Loader";
import ExerciseCard from './ExerciseCard';

const HorizontalScrollbar = ({data, bodyParts}) => {
    const SwipeToSeeMore = () => {
        return (
          <Typography className="swipe-to-see-more" sx={{bottom : bodyParts ? '320px' : '430px'}}>
            <p>Swipe to see more </p>
          </Typography>
        );
    };
    if(data.length === 0)
    return(<Loader />);
    return(
        <ScrollMenu RightArrow={SwipeToSeeMore}>
            <div className="xyz">
                {data?.map((item) => {
                    return(<Box key={item.id || item} itemId={item.id || item} title={item.id || item}>
                        {bodyParts ? <BodyPart item={item} /> : <ExerciseCard exercise={item} />}
                    </Box>)
                })}
            </div>
            
        </ScrollMenu>
    );
};

export default HorizontalScrollbar;