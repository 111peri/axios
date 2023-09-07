const axios = require('axios');


const fetchPosts = async() => {
    try {
        const response = await axios.get('http://localhost:3000/posts');
        const posts = response.data;
        const postList = document.getElementById('post-list');
        postList.innerHTML = '';
        posts.forEach(post => {
            const li = document.createElement('li');
            li.innerHTML = `
        <p><strong>${post.title}</strong></p>
        <p>${post.body}</p>
        <button onclick="deletePost(${post.id})">Удалить</button>
      `;
            postList.appendChild(li);
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};


const deletePost = async(postId) => {
    try {
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        fetchPosts();
    } catch (error) {
        console.error('Ошибка при удалении поста:', error);
    }
};


const createPost = async(title, body) => {
    try {
        await axios.post('http://localhost:3000/posts', { title, body });
        fetchPosts();
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
    }
};


const createPostForm = document.getElementById('create-post-form');
createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const title = titleInput.value;
    const body = bodyInput.value;
    createPost(title, body);
    titleInput.value = '';
    bodyInput.value = '';
});


fetchPosts();