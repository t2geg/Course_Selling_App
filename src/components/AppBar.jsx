import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AppBar = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserEmail(data.username);
            })
    }, [])
    console.log(userEmail);

    if (userEmail) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <Typography variant="h6">Coursera</Typography>
                </div>
                <div style={{
                    display: "flex"
                }}>

                    <div>{userEmail}</div>

                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                window.location = '/';
                                localStorage.setItem("token", null);
                            }}
                        >Logout</Button>
                    </div>

                </div>
            </div >
        )
    }

    else return (
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div>
                <Typography variant="h6">Coursera</Typography>
            </div>
            <div style={{
                display: "flex"
            }}>

                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate('/signup')
                        }}
                    >SignUp</Button>
                </div>

                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate('/login')
                        }}
                    >SignIn</Button>
                </div>

            </div>
        </div >
    )
}

export default AppBar