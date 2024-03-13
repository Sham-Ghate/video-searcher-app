import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function App() {
  const [searchText, setSearchText] = useState();
  const [videos, setVideos] = useState([]);
  const [debounceTimerId, setDebounceTimerId] = useState(null);
  console.log(">", searchText, debounceTimerId);
  const fetchVideos = async (searchText) => {
    let url = "https://content-xflix-backend.azurewebsites.net/v1/videos";
    if (searchText) {
      url += `?title=${searchText}`;
    }
    let res = await axios.get(url);
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // useEffect(() => {
  // schedule this call (t) after 800ms - (10)
  // cancel the call with id 10
  // schedule this call (to) after 800ms - (11)
  // cancel the call id 11
  // schedule this call (top) after 800ms - (12)
  // clearTimeout(debounceTimerId);
  // if (searchText !== undefined) {
  //   let timerId = setTimeout(() => {
  //     fetchVideos(searchText);
  //   }, 800);
  //   console.log("Updating debounce timer ", timerId);
  //   setDebounceTimerId(timerId);
  // }
  // }, [searchText]);

  useEffect(() => {
    return () => {
      console.log(">cancel ", debounceTimerId);
      clearTimeout(debounceTimerId);
    };
  }, [debounceTimerId]);

  return (
    <div>
      <TextField
        sx={{
          marginBottom: "8px"
        }}
        label="Search..."
        variant="filled"
        value={searchText}
        onChange={async (e) => {
          setSearchText(e.target.value);
          let timerId = setTimeout(() => {
            fetchVideos(e.target.value);
          }, 800);
          setDebounceTimerId(timerId);
          // let res = await axios.get(
          //   `https://content-xflix-backend.azurewebsites.net/v1/videos?title=${e.target.value}`
          // );
          // setVideos(res.data.videos);
        }}
      />
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid key={video.id} item xs={12} md={6} lg={3}>
            <VideoCard
              title={video.title}
              previewImage={video.previewImage}
              releaseDate={video.releaseDate}
              genre={video.genre}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
