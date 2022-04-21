//imports
import React from "react";
import { useEffect, useState } from "react";


//Materials page content
export default function Materials() {

  
  //use state to hold result of fetch
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    let getCourses = async () => {

      let fetchResponse = await fetch("http://localhost:5000/materials")
      console.log(fetchResponse)

      let courseData = await fetchResponse.json()
      console.log(courseData)

      setAllCourses(courseData)
    }
    getCourses()
  }, [])
  console.log(allCourses)


  return (

    /* content returned to Materials page */
    <div>
      
        {allCourses.map((course) => {
          return (
            <span>
              <p>{course.id}</p>
              <p>{course.name}</p>
              
            </span>
          )
        })}
    </div>
  );
}
