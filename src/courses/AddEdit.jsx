import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { courseService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        authorName: Yup.string()
            .required('Author Name is required'),
        rating: Yup.string()
            .required('Rating is required'),
        link:Yup.string()
            .required('Link is required')
        
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createCourse(data)
            : updateCourse(id, data);
    }

    function createCourse(data) {
        return courseService.create(data)
            .then(() => {
                alertService.success('Course added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateCourse(id, data) {
        return courseService.update(id, data)
            .then(() => {
                alertService.success('Course updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get course and set form fields
            courseService.getById(id).then(course => {
                const fields = ['title', 'authorName', 'rating', 'link'];
                fields.forEach(field => setValue(field, course[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Course' : 'Edit Course'}</h1>
            <div className="form-row">
                {/* <div className="form-group col">
                    <label>Title</label>
                    <select name="title" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                    </select>
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div> */}
                <div className="form-group col-5">
                    <label>Title</label>
                    <input name="title" type="text" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>                
                <div className="form-group col-5">
                    <label>Author Name</label>
                    <input name="authorName" type="text" ref={register} className={`form-control ${errors.authorName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.authorName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Rating</label>
                    <input name="rating" type="text" ref={register} className={`form-control ${errors.rating ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.rating?.message}</div>
                </div>
                <div className="form-group col-7">
                    <label>Link</label>
                    <input name="link" type="text" ref={register} className={`form-control ${errors.link ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.link?.message}</div>
                </div>
                {/* <div className="form-group col">
                    <label>Role</label>
                    <select name="role" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Course">Course</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <div className="invalid-feedback">{errors.role?.message}</div>
                </div> */}
            </div>
            {/* {!isAddMode &&
                <div>
                    <h3 className="pt-3">Change Password</h3>
                    <p>Leave blank to keep the same password</p>
                </div>
            }
            <div className="form-row">
                <div className="form-group col">
                    <label>Password</label>
                    <input name="password" type="password" ref={register} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Confirm Password</label>
                    <input name="confirmPassword" type="password" ref={register} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
            </div> */}
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };