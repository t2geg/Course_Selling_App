import { Card, Typography } from '@mui/material';
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
        <CourseCard course={course} />
    )
}

export default Course