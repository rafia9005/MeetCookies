import { API_URL } from '../config/config';

export async function getPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { data: [] };
  }
}
