<script lang="ts">
  export let post: {
    id: number;
    content: string;
    user: {
      username: string;
      email: string;
    };
    like: number;
    comment: number;
    created_at: string;
    updated_at: string;
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
</script>

<a
  href={`/posts/${post.user.username}/${post.id}`}
  class="block bg-gray-800 p-8 mb-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-4 md:mx-10"
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
    <span class="flex items-center">
      <svg
        class="w-5 h-5 text-purple-400 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-7-7l7 7-7 7"
        ></path>
      </svg>
      {post.like} Likes
    </span>
    <span class="flex items-center">
      <svg
        class="w-5 h-5 text-slate-500 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 8h10M7 12h10m-9 4h8"
        ></path>
      </svg>
      {post.comment} Comments
    </span>
  </div>
</a>
