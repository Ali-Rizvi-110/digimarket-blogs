import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [paragraphs, setParagraphs] = useState([
    { title: '', content: '', image: null },
    { title: '', content: '', image: null },
    { title: '', content: '', image: null },
    { title: '', content: '', image: null },
    { title: '', content: '', image: null },
  ]);

  useEffect(()=>{
    console.log(paragraphs);
  }, [paragraphs])

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleParagraphChange = (e, index) => {
    const { name, value, files } = e.target;
    const newParagraphs = [...paragraphs];

    if (name === 'image' && files.length > 0) {
      newParagraphs[index] = {
        ...newParagraphs[index],
        image: files[0],
      };
    } else {
      newParagraphs[index] = {
        ...newParagraphs[index],
        [name]: value,
      };
    }

    setParagraphs(newParagraphs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('mainImage', image);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);

      paragraphs.forEach((paragraph, index) => {
        console.log(paragraph)
        formData.append(`title${index + 1}`, paragraph.title);
        formData.append(`para${index + 1}`, paragraph.content);
        formData.append(`image${index + 1}`, paragraph.image);
      });

      console.log('Form Data:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

await axios.post('http://localhost:3000/blogs', formData);

      // Reset form fields
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
      setParagraphs([
        { title: '', content: '', image: null },
        { title: '', content: '', image: null },
        { title: '', content: '', image: null },
        { title: '', content: '', image: null },
        { title: '', content: '', image: null },
      ]);

      setMessage('Blog created successfully');
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage('Failed to create blog');
    }
  };

  return (
    <div>
      <h2>Create a Blog</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            Select a Category
            <option value="mostRecent">Most Recent</option>
            <option value="seo">SEO</option>
            <option value="advertisement">Advertising</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <br />
        <label>
          Main Image:
          <input type="file" onChange={handleFileChange} required />
        </label>
        <br />

        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <label>
              Paragraph Title {index + 1}:
              <input
                type="text"
                name="title"
                value={paragraph.title}
                onChange={(e) => handleParagraphChange(e, index)}
              />
            </label>
            <br />
            <label>
              Paragraph Image {index + 1}:
              <input
                type="file"
                name={`image`}
                onChange={(e) => handleParagraphChange(e, index)}
              />
            </label>
            <br />
            <label>
              Paragraph Content {index + 1}:
              <textarea
                name="content"
                value={paragraph.content}
                onChange={(e) => handleParagraphChange(e, index)}
              />
            </label>
            <br />
            <br />
          </div>
        ))}

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default App;
