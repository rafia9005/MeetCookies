<script>
  let user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    bio: 'Just another developer. Passionate about coding and coffee.',
    posts: [
      {
        id: 1,
        content: 'Just finished a new project! #excited',
        created_at: '2024-08-20T12:34:56Z',
        likes: 120,
        comments: 45,
      },
      {
        id: 2,
        content: 'Exploring new features in Svelte!',
        created_at: '2024-08-19T15:22:00Z',
        likes: 85,
        comments: 30,
      },
    ],
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
</script>

<main class="bg-gray-900 text-gray-100 min-h-screen p-4">
  <!-- Profile Section -->
  <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
    <div class="flex flex-col sm:flex-row items-center">
      <!-- Avatar -->
      <div
        class="bg-purple-600 w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 sm:mb-0 sm:mr-6"
      >
        {user.username[0]}
      </div>
      <div class="text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-bold mb-2">{user.name}</h1>
        <p class="text-xl sm:text-2xl font-semibold text-gray-300 mb-2">
          @{user.username}
        </p>
        <p class="text-gray-400 mb-4">{user.email}</p>
        <p class="text-gray-200 mb-4">{user.bio}</p>
        <a
          href="#"
          class="inline-block bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Edit Profile
        </a>
      </div>
    </div>
  </div>

  <!-- Posts Section -->
  <div class="max-w-4xl mx-auto">
    {#each user.posts as post}
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center mb-4">
          <!-- Avatar Placeholder -->
          <div
            class="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 sm:mb-0 sm:mr-4"
          >
            {user.username[0]}
          </div>
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-slate-100 mb-1">
              {user.username}
            </h2>
            <p class="text-slate-400 text-sm">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <p class="text-slate-200 mb-4">{post.content}</p>
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-400 text-sm"
        >
          <span class="flex items-center gap-1 mb-2 sm:mb-0">
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
                d="M6 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            {post.likes}
          </span>
          <span class="flex items-center gap-1">
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
            {post.comments}
          </span>
        </div>
      </div>
    {/each}
  </div>
</main>
