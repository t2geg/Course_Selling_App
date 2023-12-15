import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {

        const fetch = async () => {
            const res = await axios.get("http://localhost:3000/admin/courses", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = res.data;
            setCourses(data.courses);
        }
        fetch();

    }, [])

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => {
            return <CourseCard course={course} />
        })}
    </div>
}

function CourseCard(props) {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200
    }}>
        <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle2">{props.course.description}</Typography>
        <img src={props.course.imageLink} alt="course-image" width={300} />
        <div style={{
            display: "flex", justifyContent: "center", marginTop: 3
        }}>
            <Button
                variant="contained"
                size='medium'
                onClick={() => {
                    navigate("/course/" + props.course._id)
                }}
            >Edit</Button>

        </div>
    </Card >
}

export default ShowCourses;