<script>
  import { ALL_EVIDENCE, GHOSTS, ghostMatches } from "./data.js";

  let selected = [];

  let possibleGhosts;
  $: if (selected.length === 0) {
    possibleGhosts = GHOSTS.map((g) => g.name);
  } else {
    possibleGhosts = GHOSTS.filter((g) => ghostMatches(g, selected)).map(
      (g) => g.name,
    );
  }

  const toggle = (evidence) => {
    if (selected.indexOf(evidence) !== -1) {
      selected = selected.filter((e) => e !== evidence);
    } else {
      selected = [...selected, evidence];
    }
  };
</script>

<div class="container">
  <h1>Phasmo Selector</h1>
  <div class="spacer" />
  <table>
    <thead>
      <tr>
        <th>Type</th>
        {#each ALL_EVIDENCE as evidence}
          <th
            class:selected={selected.indexOf(evidence.short) !== -1}
            on:click={() => toggle(evidence.short)}>
            {evidence.long}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each GHOSTS as ghost}
        <tr>
          <td class:impossible={possibleGhosts.indexOf(ghost.name) === -1}>
            {ghost.name}
          </td>
          {#each ALL_EVIDENCE as evidence}
            <td
              class:selected={selected.indexOf(evidence.short) !== -1}
              on:click={() => toggle(evidence.short)}>
              {ghost.evidence[evidence.short] ? "X" : ""}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  :global(body) {
    background-color: #191c25;
    color: white;
  }

  .container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .spacer {
    padding-top: 1rem;
  }

  table {
    width: 100%;
  }

  th {
    padding: 1rem;
  }

  th:not(:first-child) {
    cursor: pointer;
  }

  td {
    text-align: center;
    padding: 1rem;
  }

  td:not(:first-child) {
    cursor: pointer;
  }

  .impossible {
    color: rgb(104, 104, 104);
  }

  .selected {
    color: rgb(223, 109, 43);
  }
</style>
