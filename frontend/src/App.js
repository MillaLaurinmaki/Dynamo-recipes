import React from "react";
import PostList from "./PostList";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ModeNight from "@mui/icons-material/ModeNight";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const ApiUrlContext = React.createContext("localhost");

// const defaultApiUrl = process.env.REACT_APP_API_URL;
const defaultApiUrl =
  "http://group1recipebook-env.eba-qmv2vkx8.eu-west-1.elasticbeanstalk.com/recipes";

function App() {
  const [apiUrl, setApiUrl] = React.useState(defaultApiUrl);
  // const [apiUrlPrompt, setApiUrlPrompt] = React.useState(defaultApiUrl);
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container fixed>
          <Box display="flex" marginTop={1} marginBottom={1}>
            <TextField
              fullWidth
              placeholder="Search for recipes"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <IconButton
              onClick={() =>
                setApiUrl(
                  `http://group1recipebook-env.eba-qmv2vkx8.eu-west-1.elasticbeanstalk.com/recipes?search=${searchValue}`
                )
              }
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setApiUrl(
                  `http://group1recipebook-env.eba-qmv2vkx8.eu-west-1.elasticbeanstalk.com/favorites`
                );
              }}
            >
              <FavoriteBorder color="primary"></FavoriteBorder>
            </IconButton>
            <IconButton
              onClick={() => {
                toggleTheme();
              }}
            >
              <ModeNight color="primary"></ModeNight>
            </IconButton>
          </Box>
          <ApiUrlContext.Provider value={apiUrl}>
            <PostList
              show={showNewDialog}
              setShowNewRecipeDialog={setShowNewDialog}
            />
          </ApiUrlContext.Provider>
          <Fab
            onClick={() => {
              setShowNewDialog(true);
            }}
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
            }}
          >
            <AddIcon />
          </Fab>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
