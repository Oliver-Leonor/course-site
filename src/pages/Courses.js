import { useEffect, useState } from 'react'

import CourseCard from '../components/CourseCard'
// import coursesData from '../data/coursesData';

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(
          data.map((course) => {
            return <CourseCard key={course.id} courseProp={course} />
          })
        )
      })
  }, [])

  return (
    <>
      <h1>Courses</h1>
      {courses}
    </>
  )
}
