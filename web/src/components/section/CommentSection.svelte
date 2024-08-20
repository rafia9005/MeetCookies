<script lang="ts">
  export let post: {
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

<div class="mt-8">
  <h3 class="text-xl font-bold text-slate-100 mb-4">Comments</h3>
  {#if post.all_comment.length > 0}
    {#each post.all_comment as comment}
      <div class="bg-gray-700 p-4 mb-4 rounded-lg h-auto">
        <div class="flex items-center mb-2">
          <div
            class="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
          >
            {comment.user.username[0]}
          </div>
          <div>
            <h4 class="text-md font-semibold text-slate-100">
              {comment.user.username}
            </h4>
            <p class="text-slate-400 text-sm">
              {formatDate(comment.created_at)}
            </p>
          </div>
        </div>
        <p class="text-slate-200 leading-relaxed">{comment.content}</p>
      </div>
    {/each}
  {:else}
    <p class="text-slate-400">No comments yet.</p>
  {/if}
</div>
