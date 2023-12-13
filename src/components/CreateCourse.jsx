import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
const CreateCourse = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");

    return (
        <>
            <div style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h6'>Create Course Below.</Typography>
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
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title" variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        label="Description" variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                    <TextField
                        onChange={(e) => setImageLink(e.target.value)}
                        label="Image Link" variant="outlined" size='small' fullWidth={true} /> <br /> <br />

                    <Button
                        variant="contained"
                        size='medium'
                        onClick={() => {
                            fetch("http://localhost:3000/admin/courses", {
                                method: "POST",
                                body: JSON.stringify(
                                    {
                                        title,
                                        description,
                                        "price": 5999,
                                        "imageLink": imageLink,
                                        "published": true
                                    }
                                ),
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })
                                .then((res) => { return res.json(); })
                                .then(() => alert("Course created successfully."))
                        }}
                    >Create</Button>
                </Card>
            </div>
        </>
    )
}

export default CreateCourse;