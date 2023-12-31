import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';


const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <>
            <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h6'>
                    Welcome to Coursera. Sign In below.
                </Typography>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Card variant="outlined" style={{
                    width: 400,
                    padding: 20
                }}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        id="username" label="Email" variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        id="pasword" label="Password" type={"password"} variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                    <Button
                        variant="contained"
                        size='medium'
                        onClick={() => {
                            fetch("http://localhost:3000/admin/login", {
                                method: "POST",
                                headers: {
                                    username: email,
                                    password: password
                                }
                            }).then((res) => {
                                return res.json();
                            }).then((data) => {
                                localStorage.setItem("token", data.token)
                                window.location = '/'
                            });
                        }}
                    >SignIn</Button>
                </Card>
            </div>



        </>
    )
}

export default Login;