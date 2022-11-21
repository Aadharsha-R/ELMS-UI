import { Role } from './'

export function configureFakeCourseBackend() {
    // array in local storage for course records
    let courses = JSON.parse(localStorage.getItem('courses')) || [{ 
        id: 1,
        title: 'Mr',
        firstName: 'Joe',
        lastName: 'Bloggs',
        email: 'joe@bloggs.com',
        role: Role.Course,
        password: 'joe123'
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/courses') && method === 'GET':
                        return getCourses();
                    case url.match(/\/courses\/\d+$/) && method === 'GET':
                        return getCourseById();
                    case url.endsWith('/courses') && method === 'POST':
                        return createCourse();
                    case url.match(/\/courses\/\d+$/) && method === 'PUT':
                        return updateCourse();
                    case url.match(/\/courses\/\d+$/) && method === 'DELETE':
                        return deleteCourse();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getCourses() {
                return ok(courses);
            }

            function getCourseById() {
                let course = courses.find(x => x.id === idFromUrl());
                return ok(course);
            }
    
            function createCourse() {
                const course = body();

                if (courses.find(x => x.email === course.email)) {
                    return error(`Course with the email ${course.email} already exists`);
                }

                // assign course id and a few other properties then save
                course.id = newCourseId();
                course.dateCreated = new Date().toISOString();
                delete course.confirmPassword;
                courses.push(course);
                localStorage.setItem('courses', JSON.stringify(courses));

                return ok();
            }
    
            function updateCourse() {
                let params = body();
                let course = courses.find(x => x.id === idFromUrl());

                // only update password if included
                if (!params.password) {
                    delete params.password;
                }
                // don't save confirm password
                delete params.confirmPassword;

                // update and save course
                Object.assign(course, params);
                localStorage.setItem('courses', JSON.stringify(courses));

                return ok();
            }
    
            function deleteCourse() {
                courses = courses.filter(x => x.id !== idFromUrl());
                localStorage.setItem('courses', JSON.stringify(courses));

                return ok();
            }
    
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newCourseId() {
                return courses.length ? Math.max(...courses.map(x => x.id)) + 1 : 1;
            }
        });
    }
};