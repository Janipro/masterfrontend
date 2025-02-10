import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function InfoCard() {
  return (
    <Card sx={{ maxWidth: 170 }}>
      <CardActionArea>
        <CardMedia component="img" height="60" image="src/assets/math.jpg" alt="math" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Matematikk 1T
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
