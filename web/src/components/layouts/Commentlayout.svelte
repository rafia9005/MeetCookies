<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getPostsById } from '../../api/posts';
  import CommentSection from '../section/CommentSection.svelte';
  import CommentInput from '../input/CommentInput.svelte';

  let post: {
    id: number;
    content: string;
    user: {
      username: string;
      email: string;
    };
    like: number;
    comment: number;
    all_comment: {
      id: number;
      content: string;
      user: {
        username: string;
        email: string;
      };
      created_at: string;
      updated_at: string;
    }[];
    created_at: string;
    updated_at: string;
  } | null = null;

  let error: string | null = null;
  let loading = true;

  const { params } = $page;

  onMount(async () => {
    try {
      const response = await getPostsById(parseInt(params.id));
      post = response.data;
    } catch (err) {
      error = 'Failed to load post details.';
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
</script>

{#if loading}
  <div
    class="border border-blue-300 rounded-md p-4 max-w-lg w-full mx-auto mt-5 h-[95vh]"
  >
    <div class="animate-pulse flex space-x-4">
      <!-- Avatar Placeholder -->
      <div class="rounded-full bg-slate-700 h-12 w-12"></div>
      <div class="flex-1 space-y-4 py-1">
        <!-- Username Placeholder -->
        <div class="h-4 bg-slate-700 rounded w-3/4"></div>
        <!-- Date Placeholder -->
        <div class="h-3 bg-slate-700 rounded w-1/4"></div>
        <!-- Content Placeholder -->
        <div class="h-4 bg-slate-700 rounded"></div>
        <div class="h-4 bg-slate-700 rounded w-5/6"></div>
        <div class="h-4 bg-slate-700 rounded w-4/5"></div>
        <!-- Likes and Comments Placeholder -->
        <div class="flex space-x-4 mt-4">
          <div class="h-3 bg-slate-700 rounded w-1/3"></div>
          <div class="h-3 bg-slate-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
{:else if error}
  <div class="text-center py-20 text-red-500">
    <p>{error}</p>
  </div>
{:else if post}
  <div class="flex justify-center min-h-screen bg-gray-900 p-4">
    <div class="w-full max-w-lg">
      <!-- Back Button -->
      <a
        href="/"
        class="absolute top-4 left-4 text-gray-400 hover:text-gray-100 transition-colors bg-purple-600 font-bold rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 25"
          stroke-width="2"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </a>

      <!-- Post Content -->
      <div
        class="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full"
      >
        <div class="flex items-center mb-4">
          <div
            class="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
          >
            {post.user.username[0]}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-100 mb-1">
              {post.user.username}
            </h2>
            <p class="text-slate-400 text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <p class="text-slate-200 mb-4 leading-relaxed">{post.content}</p>
        <div class="flex justify-between items-center text-slate-400">
          <span class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            {post.like} Like
          </span>
          <span class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            {post.comment} Comments
          </span>
        </div>
        <div class="mt-4">
          <CommentInput {post} />
          <!-- Comments Section -->
          <CommentSection {post} />
        </div>
      </div>
    </div>
  </div>
{/if}
