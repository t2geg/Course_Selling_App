
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const navigate = useNavigate();
    return <div>
        <Grid container>
            <Grid item lg={6} md={12} sm={12}>
                <div style={{ border: "1px solid transparent", paddingLeft: 20, marginTop: 200 }}>
                    <Typography variant="h4"><b>Welcome to Coursera</b></Typography>
                    <Typography variant="h6">A place to learn,earn and grow.</Typography> <br />
                    <Typography variant="subtitle">Login or Signup as Admin</Typography> <br />
                    <Button variant="contained" size='small' onClick={() => { navigate('/login') }}>
                        SignIn
                    </Button>

                    <Button variant="contained" size='small' onClick={async () => { navigate('/signup') }} style={{ margin: 10 }}>
                        SignUp
                    </Button>
                </div>
            </Grid>
            <Grid item lg={6} md={12} sm={12} style={{ backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src="/img.jpg" alt="landing-image" style={{ maxWidth: 650, marginTop: 100, marginLeft: 20 }} />
                </div>
            </Grid>
        </Grid>



    </div >
}

export default Landing;