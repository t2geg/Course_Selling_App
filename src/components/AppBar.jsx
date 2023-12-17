import { Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AppBar = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    const init = async () => {
        const res = await axios.get("http://localhost:3000/admin/me", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.data.username) {
            setUserEmail(res.data.username);
        }
    };

    useEffect(() => {
        init()
    }, [])


    if (userEmail) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px"
            }}>
                <div>
                    <Typography variant="h6" style={{ marginLeft: "10px" }}>Coursera</Typography>
                </div>

                <div style={{
                    display: "flex"
                }}>

                    {/* <div>{userEmail}</div> */}

                    <div>
                        <Button
                            variant={"text"}
                            onClick={() => {
                                navigate('/addcourse');
                            }}
                        >Add Course</Button>

                        <Button
                            variant={"text"}
                            onClick={() => {
                                navigate('/courses');
                            }}
                        >Courses</Button>

                        <Button
                            variant={"contained"}
                            style={{ marginRight: 4 }}
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
            justifyContent: "space-between",
            margin: "4px"
        }}>
            <div>
                <Typography variant="h6" style={{ marginLeft: 10 }}>Coursera</Typography>
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
                        style={{ marginRight: 4 }}
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