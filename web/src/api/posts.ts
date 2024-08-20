import { API_URL } from '../config/config';

export async function getPosts() {
  try {
    const result = await fetch(`${API_URL}/posts`);
    if (!result.ok) {
      throw new Error(`Error fetching posts: ${result.statusText}`);
    }
    return await result.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { data: [] };
  }
}

export async function getPostsById(id: number) {
  try {
    const result = await fetch(`${API_URL}/posts/${id}`);
    if (!result.ok) {
      throw new Error('Posts not found');
    }
    return result.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
