import { Button, Card, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Course = () => {

    let { courseId } = useParams();
    const [course, setCourse] = useState("");

    useEffect(() => {

        const fetch = async () => {
            const res = await axios.get(`http://localhost:3000/admin/courses/${courseId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            const data = res.data;
            setCourse(data.course);
        }
        fetch();
    }, [])

    // while data is being fetched or data is not present wrong id
    if (!course) {
        return (
            <div>Loading......</div>
        )
    }

    return (
        <>
            <GrayTopper title={course.title} />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard course={course} setCourse={setCourse} />
                </Grid>

                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard course={course} />
                </Grid>

            </Grid>
        </>
    )
}


function GrayTopper({ title }) {
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: 'white', fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function CourseCard({ course }) {
    return <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={course.imageLink} alt="course-image" style={{ width: 350 }} />
        <div style={{ marginLeft: 10 }}>
            <Typography variant='h5'>{course.title}</Typography>
            <Typography variant='subtitle2' style={{ color: "gray" }}>
                Price
            </Typography>
            <Typography variant='subtitle1'>
                <b>Rs {course.price}</b>
            </Typography>
        </div>
    </Card >
}

function UpdateCard({ course, setCourse }) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [imageLink, setImageLink] = useState(course.imageLink);
    const [price, setPrice] = useState(course.price);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ width: 500, marginTop: 200, marginLeft: -200 }}>
                <div style={{ padding: 20 }}>
                    <Typography style={{ marginBottom: 10 }}>Update Course details</Typography>
                    <TextField
                        value={title} style={{ marginBottom: 10 }} onChange={(e) => setTitle(e.target.value)}
                        label="Title" variant="outlined" size='small' fullWidth={true} /> <br />
                    <TextField
                        value={description} style={{ marginBottom: 10 }} onChange={(e) => setDescription(e.target.value)}
                        label="Description" variant="outlined" size='small' fullWidth={true} /> <br />
                    <TextField
                        value={imageLink} style={{ marginBottom: 10 }} onChange={(e) => setImageLink(e.target.value)}
                        label="Image Link" variant="outlined" size='small' fullWidth={true} /> <br />
                    <TextField
                        value={price} style={{ marginBottom: 10 }} onChange={(e) => setPrice(e.target.value)}
                        label="Price" variant="outlined" size='small' fullWidth={true} /> <br />

                    <Button
                        variant="contained"
                        size='medium'
                        onClick={() => {

                            axios.put("http://localhost:3000/admin/courses/" + course._id, {
                                _id: course._id,
                                title,
                                description,
                                price,
                                "imageLink": imageLink,
                                "published": true
                            }, {
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            });
                            let updatedCourse = {
                                title: title,
                                description: description,
                                price: price,
                                imageLink: imageLink,
                                published: true
                            }
                            setCourse(updatedCourse);
                        }}
                    >Update Course</Button>
                </div>
            </Card>
        </div>
    )
}

export default Course


// In this re-rendering is happening of whole which is not needed
// Just the updated component must be re-rendered
// Thatswhy state management is important