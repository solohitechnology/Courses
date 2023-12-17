// Catigories.js

import React, { useState } from 'react';
import './postbook.css';
import axios from 'axios';

const categoriesData = [
    'Books On Technologies',
    'Books On Business Improvement',
    'Religion',
    'Games',
    'Technologies',
    'Art & Museum',
    'Architecture',
    'Health',
    'Languages',
    'Education',
];

const PostBook = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [pages, setpages] = useState('');
    const [size, setSize] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('category', selectedCategory);
            formData.append('title', title);
            formData.append('author', author);
            formData.append('description', description);
            formData.append('pages', pages);
            formData.append('size', size);
            formData.append('date', date);
            formData.append('price', price)
            formData.append('pdf', file);
            formData.append('picture', photo);



            // Make the POST request using Axios
            const response = await axios.post('/api/allbook/addnewbook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response as needed
            console.log('Response:', response.data);

            // Clear form fields
            setSelectedCategory('');
            setTitle('');
            setAuthor('');
            setDescription('');
            setpages(0);
            setSize(0);
            setDate('');
            setPrice(0)
            setFile(null);
            setPhoto(null);
        } catch (error) {
            console.error('Error:', error);
            // Handle error as needed
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload a Book</h2>
            <label htmlFor="category">Category</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categoriesData.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="author">Author</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />

            <label htmlFor="author">Pages:</label>
            <input
                type="number"
                id="author"
                value={pages}
                onChange={(e) => setpages(e.target.value)}
                required
            />

            <label htmlFor="author">Size:</label>
            <input
                type="number"
                id="author"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
            />



            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />


            <label htmlFor="year">Year:</label>
            <input
                type="date"
                id="author"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />


            <label htmlFor="author">PDF-File: </label>
            <input
                type="file"
                id="author"
                name='pdf'
                onChange={(e) => setFile(e.target.files[0])}
                required
            />

            <label htmlFor="author">Photo-File: </label>
            <input
                type="file"
                id="author"
                name='picture'
                onChange={(e) => setPhoto(e.target.files[0])}
                required
            />


            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => {
                    if (e.target.value.length <= 50) {
                        setDescription(e.target.value);
                    }
                }}
                maxLength="50"
                disabled  // Add the 'disabled' attribute to disable the textarea
                required
            ></textarea>


            <button style={{ background: "skyblue" }} type="submit">Upload Book</button>
        </form>
    );
};

export default PostBook;
