<script lang="ts">
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
  } from '@tanstack/svelte-table';

  /** @type {any[]} */
  export let data = [];
  /** @type {ColumnDef<any, any>[]} */
  export let columns = [];

  const table = createSvelteTable({
    get data() { return data },
    get columns() { return columns },
    getCoreRowModel: getCoreRowModel(),
  });

</script>

<table>
  <thead>
    {#each $table.getHeaderGroups() as headerGroup}
      <tr>
        {#each headerGroup.headers as header}
          <th colSpan={header.colSpan}>
            {#if !header.isPlaceholder}
              <svelte:component
                this={flexRender(header.column.columnDef.header, header.getContext())} />
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
  </thead>
  <tbody>
    {#each $table.getRowModel().rows as row}
      <tr>
        {#each row.getVisibleCells() as cell}
          <td>
            <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

