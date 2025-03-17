import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

export default function InfoCard({ title, id }: { title: string; id: number }) {
  return (
    <Card sx={{ maxWidth: 170, height: 130 }}>
      <CardActionArea>
        <Link to={`/class/${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <CardMedia component="img" height="60" image="src/assets/math.jpg" alt="math" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {title}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
