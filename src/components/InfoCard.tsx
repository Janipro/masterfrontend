import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function InfoCard() {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia component="img" height="80" image="src/assets/math.jpg" alt="math" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Matematikk 1T
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            I dette faget skal du lære om funksjoner
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
