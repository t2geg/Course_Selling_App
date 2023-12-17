import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <div style={{
                marginTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h6'>
                    Welcome to Coursera. Sign up below.
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
                        id="password" label="Password" type={"password"} variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                    <Button
                        variant="contained"
                        size='medium'
                        onClick={async () => {
                            const res = await axios.post("http://localhost:3000/admin/signup", {
                                username: email,
                                password: password
                            });
                            const data = res.data;
                            localStorage.setItem("token", data.token);
                            navigate('/');
                        }}
                    >SignUp</Button>
                </Card>
            </div >



        </>
    )
}

export default SignUp