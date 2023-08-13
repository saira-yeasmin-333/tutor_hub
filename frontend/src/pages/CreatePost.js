import React from 'react';
import { useParams } from 'react-router-dom';
import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const platforms = [
  "offline",
  "online",
  "both"
];

const CreatePost = () => {
  const { id } = useParams();
  // Now you have access to the ID from the URL in the "id" variable
  console.log('User ID:', id);


  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [subject, setSubject] = React.useState("");
  const [class_, setClass] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [platform, setPlatform] = React.useState("");

  const changeClass = (event) => {
    setClass(event.target.value);
  };

  const changeSubject = (event) => {
    setSubject(event.target.value);
  };

  

  return (
    <div>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#0067AB", paddingBottom: 5 }}>
              Create new post here...
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Choose Subject
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subject}
                  label="Subject"
                  onChange={changeSubject}
                >
                  {subjects.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Choose Class
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={class_}
                  label="Class"
                  onChange={changeClass}
                >
                  {classes.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Budget
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lower_budget"
                                name="lower_budget"
                                label="Lower Limit"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="upper_budget"
                                name="upper_budget"
                                label="Upper Limit"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>



            <Grid item xs={12} sm={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={platform}
                  label="Platform"
                  onChange={setPlatform}
                >
                  {platforms.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={12}>
                <Button variant="contained" sx={{ justifyContent: "center" }}>
                  Submit
                </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default CreatePost;