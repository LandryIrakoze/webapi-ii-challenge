import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogContainer = () => {

    const [blog, setblog] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost/8000/api/posts`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
        Blog Container
        </>
    )
}

export default BlogContainer;