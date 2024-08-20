<script>
  import { Link } from 'svelte-routing';
  let username = '';
  let password = '';

  function handleLogin() {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-900">
  <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
    <h1 class="text-2xl font-bold text-purple-500 mb-6 text-center">
      Login MeetPookie
    </h1>
    <form action="">
      <div class="mb-4">
        <label
          class="block text-gray-400 text-sm font-medium mb-2"
          for="username"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          bind:value={username}
          class="w-full px-3 py-2 border border-gray-600 rounded text-gray-200 bg-gray-700"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="mb-6">
        <label
          class="block text-gray-400 text-sm font-medium mb-2"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          class="w-full px-3 py-2 border border-gray-600 rounded text-gray-200 bg-gray-700"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        class="w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition-colors"
        on:click={handleLogin}
      >
        Login
      </button>
    </form>
    <div class="mt-2">
      <p>
        you dont have account? <a href="/auth/register" class="text-blue-500"
          >create account</a
        >
      </p>
    </div>
  </div>
</div>
