import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { courseService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        courseService.getAll().then(x => setCourses(x));
    }, []);

    function deleteCourse(id) {
        setCourses(courses.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        courseService.delete(id).then(() => {
            setCourses(courses => courses.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Courses</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Course</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Title</th>
                        <th style={{ width: '30%' }}>AuthorName</th>
                        <th style={{ width: '30%' }}>Rating</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {courses && courses.map(course =>
                        <tr key={course.id}>
                            <td>{course.title} </td>
                            <td>{course.authorName}</td>
                            <td>{course.rating}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${course.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCourse(course.id)} className="btn btn-sm btn-danger btn-delete-course" disabled={course.isDeleting}>
                                    {course.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!courses &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {courses && !courses.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Courses To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };