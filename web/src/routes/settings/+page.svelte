<script>
  let settings = {
    notifications: true,
    darkMode: false,
    privacy: 'Public',
  };

  function toggleNotifications() {
    settings.notifications = !settings.notifications;
  }

  function toggleDarkMode() {
    settings.darkMode = !settings.darkMode;
  }

  function changePrivacy(newPrivacy) {
    settings.privacy = newPrivacy;
  }
</script>

<main class="bg-gray-900 text-gray-100 min-h-screen p-4">
  <!-- Settings Section -->
  <div class="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Settings</h1>

    <div class="space-y-4">
      <!-- Notifications -->
      <div class="flex items-center justify-between bg-gray-700 p-4 rounded-md">
        <div class="text-lg font-medium">Notifications</div>
        <input
          type="checkbox"
          id="notifications"
          checked={settings.notifications}
          on:change={toggleNotifications}
          class="form-checkbox h-5 w-5 text-purple-600"
        />
      </div>

      <!-- Dark Mode -->
      <div class="flex items-center justify-between bg-gray-700 p-4 rounded-md">
        <div class="text-lg font-medium">Dark Mode</div>
        <input
          type="checkbox"
          id="darkMode"
          checked={settings.darkMode}
          on:change={toggleDarkMode}
          class="form-checkbox h-5 w-5 text-purple-600"
        />
      </div>

      <!-- Privacy -->
      <div class="bg-gray-700 p-4 rounded-md">
        <div class="text-lg font-medium mb-2">Privacy</div>
        <div class="flex gap-4">
          <button
            on:click={() => changePrivacy('Public')}
            class={`py-2 px-4 rounded-md ${settings.privacy === 'Public' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-purple-700`}
          >
            Public
          </button>
          <button
            on:click={() => changePrivacy('Friends')}
            class={`py-2 px-4 rounded-md ${settings.privacy === 'Friends' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-purple-700`}
          >
            Friends
          </button>
          <button
            on:click={() => changePrivacy('Private')}
            class={`py-2 px-4 rounded-md ${settings.privacy === 'Private' ? 'bg-purple-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-purple-700`}
          >
            Private
          </button>
        </div>
      </div>
    </div>
  </div>
</main>
