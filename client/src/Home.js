import * as React from 'react';
import './Home.css'
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EnglishImg from './components/P6English/EnglishImg.jpg';

// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {red} from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import Avatar from '@mui/material/Avatar';
//import Grid from '@mui/material/Grid';

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Home() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="title">
            <h4> Domanda - Play and Learn </h4>
            <br></br>
            <div className="wrapper">
                <Card sx={{maxWidth: 345}}>
                    <CardHeader
                        title="Primary 6 English"
                        // subheader="25 January 2023"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={EnglishImg}
                        alt="Primary 6 English"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        PSLE English stands for Primary School Leaving Examination English. 
                        It is a national examination taken by students in Singapore at the end of their primary school education, 
                        typically when they are 12 years old. The exam assesses their proficiency in the English language, including 
                        listening, speaking, reading and writing skills.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="play">
                            <a href="/p6English">
                                <PlayArrowIcon/>
                            </a>
                        </IconButton>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Details:</Typography>
                            <Typography paragraph>
                                Questions on P6 English.
                                Published in March 2023.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>

            </div>
        </div>
    )

}

export default Home;