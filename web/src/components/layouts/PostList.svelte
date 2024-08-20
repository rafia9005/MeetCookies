<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getPosts } from '../../api/posts';
  import PostCard from '../elements/PostCard.svelte';

  interface User {
    username: string;
    email: string;
  }

  interface Post {
    id: number;
    content: string;
    user: User;
    like: number;
    comment: number;
    created_at: string;
    updated_at: string;
  }

  let posts: Post[] = [];
  let error: string | null = null;
  let intervalId: number | null = null;

  async function fetchPosts() {
    try {
      const result = await getPosts();
      if (Array.isArray(result.data)) {
        posts = result.data.sort((a: Post, b: Post) => {
          const likeComparison = b.like - a.like;
          if (likeComparison !== 0) return likeComparison;
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
      } else {
        posts = [];
      }
    } catch (err) {
      error = 'Failed to load posts.';
      console.error(err);
    }
  }

  onMount(() => {
    fetchPosts();
    intervalId = setInterval(fetchPosts, 5000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

{#if error}
  <p class="text-red-500 text-center text-lg font-semibold">{error}</p>
{/if}

{#each posts as post}
  <div class="mx-2">
    <PostCard {post} />
  </div>
{/each}
