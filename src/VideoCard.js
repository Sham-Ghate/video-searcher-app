import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default ({ title, releaseDate, previewImage, genre }) => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={previewImage} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {releaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};
