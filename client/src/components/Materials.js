//imports
import React from "react";
import { useEffect, useState } from "react";


//Materials page content
export default function Materials() {

  //use state to hold result of fetch
  const [allCourses, setAllCourses] = useState([]);

  //
  useEffect(() => {
    fetch(`https://zakariahrittenhouse.talentlms.com/api/courses`, {
      headers: {
        "X-Auth-Token": process.env.APIKEY
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setAllCourses(json);
    });
  })

  return (

    /* content returned to Materials page */
    <div className="materialsBody">

      {/* header for materials page */}
      <h2 className="materialsHeader">Courses and Materials</h2>
      
      <table>
        <thead>

        </thead>
        <tbody>
          {allCourses.map((course) => {
            return (
              <tr key={course._id}>
                <td>{course.courseMaterials}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
        
    </div>
  );
}
