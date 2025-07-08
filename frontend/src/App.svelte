<script>
  import { onMount } from 'svelte';
  import { createColumnHelper } from '@tanstack/svelte-table';
  import DataTable from './DataTable.svelte';

  let users = [];
  let isLoading = true;

  const columnHelper = createColumnHelper();

  // Define table columns
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('firstName', {
      header: 'First Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => info.getValue(),
    }),
  ];

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      if (!response.ok) throw new Error('Network response was not ok');
      users = await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      isLoading = false;
    }
  });
</script>

<main>
  <h1>Svelte & TanStack Table</h1>
  {#if isLoading}
    <p>Loading data from backend...</p>
  {:else if users.length}
    <DataTable data={users} {columns} />
  {:else}
    <p>No user data found or failed to load.</p>
  {/if}
</main>

