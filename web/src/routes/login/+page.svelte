<script>
  let username = '';
  let password = '';

  function handleLogin() {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
    <h1 class="text-2xl font-bold text-purple-500 mb-6 text-center">
      Login MeetPookie
    </h1>
    <form action="">
      <div class="mb-4">
        <label
          class="block text-slate-500 text-sm font-medium mb-2"
          for="username">Username</label
        >
        <input
          id="username"
          type="text"
          bind:value={username}
          class="w-full px-3 py-2 border rounded text-slate-500"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="mb-6">
        <label
          class="block text-slate-500 text-sm font-medium mb-2"
          for="password">Password</label
        >
        <input
          id="password"
          type="password"
          bind:value={password}
          class="w-full px-3 py-2 border rounded text-slate-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        class="w-full bg-purple-500 text-white font-bold py-2 rounded hover:bg-purple-600"
        on:click={handleLogin}
      >
        Login
      </button>
    </form>
  </div>
</div>
