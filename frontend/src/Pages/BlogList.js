import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';


function BlogList() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [blog, setBlog] = useState({
        id: "",
        title: "",
        date_added: ""
    });

    const [blogList, setBlogList] = useState([]);

    const getBlogList = async () => {
        const api = await fetch("http://localhost:8000/blogs/", {
            method: "GET"
        });
        const res = await api.json();
        // console.log(res)
        setBlogList(res);
    }

    const changeHandler = (e)=>{
        const {name, value} = e.target
        setBlog({...blog, [name]:value})
    }

    const Submit = async (e) => {
        e.preventDefault()
        const api = await fetch("http://localhost:8000/blogs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(blog)
        });
        const res = await api.json();
        if(res){
            console.log(res);
            handleClose();
            swal(`${blog.title}`, `New post added successfully!`, "success");
            getBlogList();
        }
        console.log(res.errors)
        
    }

    useEffect(() => {
        getBlogList();
    }, [])

    return (
        <>
            <div className='btn btn-dark btn-sm my-5 mx-3' onClick={handleShow}>Add New Post</div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Blog Title</Form.Label>
                            <Form.Control size="sm" type="text" name="title" value={blog.title} onChange={changeHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Blog Content</Form.Label>
                            <Form.Control size="sm" as="textarea" name="content" value={blog.content} onChange={changeHandler} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger btn-sm' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn btn-primary btn-sm' onClick={Submit}>
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>

            <table className="table table-hover container">
                <thead className='table-dark'>
                    <tr>
                        
                        <th scope="col">Title</th>
                        <th scope="col">Date Added</th>
                    </tr>
                </thead>
                <tbody className='table-primary'>
                    {blogList && blogList.map((blog, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    <Link className='link' to={`/blog-detail/${blog.id}`}>
                                        {blog.title}
                                    </Link></th>
                    
                                <td>{blog.date_added}</td>
                            </tr>
                        )
                    })
                    }

                </tbody>
            </table>
        </>
    )
}

export default BlogList