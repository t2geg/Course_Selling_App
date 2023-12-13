import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
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
                setCourses(data.courses);
            })
    }, [])

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => {
            return <CourseCard course={course} />
        })}
    </div>
}

export function CourseCard(props) {
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200
    }}>
        <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle2">{props.course.description}</Typography>
        <img src={props.course.imageLink} alt="course-image" width={300} />
    </Card>
}

export default ShowCourses;