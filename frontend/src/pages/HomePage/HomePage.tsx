import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Grid container>
      <Grid item xs={12} className="home-page-title">
        <div className="home-page-title-container">
          <h1>Create your own virtual library</h1>
          <Link to="/addNewBook">Add new books {" >"}</Link>
        </div>
      </Grid>
      <Grid container className="home-page-content-container">
        <Grid item xs={12}>
          <Typography
            className="home-page-content"
            sx={{
              fontSize: "1.5rem",
              margin: "1rem auto",
              fontFamily: "Noto Serif",
              fontWeight: "600",
            }}
          >
            What is a virtual library?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            A virtual library offers a convenient and enjoyable platform to
            showcase a diverse collection of digital publications. Similar to a
            physical bookshelf, it enables you to organize and present a variety
            of materials in one centralized location.
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="home-page-content-container">
        <Grid item xs={12}>
          <Typography
            className="home-page-content"
            sx={{
              fontSize: "1.5rem",
              margin: "1rem auto",
              fontFamily: "Noto Serif",
              fontWeight: "600",
              textAlign: "end",
            }}
          >
            Why make a virtual library?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            By reducing the need for physical resources and infrastructure,
            virtual libraries contribute to environmental sustainability. They
            minimize paper usage, energy consumption, and carbon emissions
            associated with traditional library operations.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
