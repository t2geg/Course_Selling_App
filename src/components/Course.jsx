import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CourseCard } from './ShowCourses';

const Course = () => {

    let { courseId } = useParams();
    const [course, setCourse] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/course/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCourse(data.course);
            })
    }, [])

    // while data is being fetched or data is not present wrong id
    if (!course) {
        return (
            <div>Loading......</div>
        )
    }

    return (
        <>
            <div style={{
                display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: 50
            }}>
                <CourseCard course={course} />
                <UpdateCard course={course} courseId={courseId} setCourse={setCourse} />
            </div>
        </>
    )
}

function UpdateCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageLink, setImageLink] = useState("");
    const course = props.course;

    return (
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Card variant="outlined" style={{
                width: 400,
                padding: 20
            }}>
                <Typography>Update Course details</Typography>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title" variant="outlined" size='small' fullWidth={true} /> <br /><br />
                <TextField
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description" variant="outlined" size='small' fullWidth={true} /> <br /> <br />
                <TextField
                    onChange={(e) => setImageLink(e.target.value)}
                    label="Image Link" variant="outlined" size='small' fullWidth={true} /> <br /><br />

                <Button
                    variant="contained"
                    size='medium'
                    onClick={() => {
                        fetch("http://localhost:3000/admin/courses/" + course.id, {
                            method: "PUT",
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
                            .then(() => {
                                const updatedCourse = {
                                    id: course.id,
                                    title: title,
                                    description: description,
                                    price: 5999,
                                    imageLink: imageLink,
                                    published: true
                                }
                                props.setCourse(updatedCourse);
                            }
                            )
                    }}
                >Update Course</Button>
            </Card>
        </div>
    )
}

export default Course