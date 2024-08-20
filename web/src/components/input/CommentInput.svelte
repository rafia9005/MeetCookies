<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface User {
    username: string;
    email: string;
  }

  interface Comment {
    id: number;
    content: string;
    user: User;
    created_at: string;
    updated_at: string;
  }

  export let post: {
    id: number;
    content: string;
    user: {
      username: string;
      email: string;
    };
    like: number;
    comment: number;
    all_comment: Comment[];
    created_at: string;
    updated_at: string;
  };

  let newComment: string = '';
  const dispatch = createEventDispatcher();

  async function handleSubmit(event: Event) {
    event.preventDefault();
    if (newComment.trim()) {
      try {
        // Replace this with the actual API call to submit the new comment
        // await submitComment(post.id, newComment);

        // Dispatch event to notify parent component about the new comment
        dispatch('commentAdded', { content: newComment });

        // Clear the input field after submitting
        newComment = '';
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  }
</script>

<form on:submit={handleSubmit} class="flex flex-col space-y-4">
  <textarea
    bind:value={newComment}
    rows="3"
    placeholder="Add a comment..."
    class="p-2 rounded border border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900"
  ></textarea>
  <button
    type="submit"
    class="self-end bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
  >
    Submit
  </button>
</form>

<style>
  textarea {
    resize: none;
  }
</style>
