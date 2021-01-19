<script>
  import { ALL_EVIDENCE, GHOSTS, ghostMatches } from "./data.js";
  import { onMount } from "svelte";
  import SvelteTooltip from "svelte-tooltip";
  import Icon from "svelte-awesome";
  import { questionCircle } from "svelte-awesome/icons";

  let selected = {};

  const toggle = (evidence) => {
    if (selected[evidence]) {
      selected[evidence] = false;
    } else {
      selected[evidence] = true;
    }
  };

  let possibleGhosts;
  $: if (selected.length === 0) {
    possibleGhosts = GHOSTS;
  } else {
    possibleGhosts = GHOSTS.filter((g) => ghostMatches(g, selected));
  }

  $: possibleGhostNames = possibleGhosts.map((g) => g.name);

  $: possibleEvidence = [
    ...new Set(
      possibleGhosts
        .map((g) => g.evidence)
        .flatMap((e) => Object.entries(e))
        .filter(([k, v]) => v)
        .map(([k, v]) => k),
    ),
  ];

  onMount(() => {
    ALL_EVIDENCE.forEach((e) => {
      selected[e.short] = false;
    });
  });
</script>

<div class="container">
  <h1>Phasmo Selector</h1>
  <div class="spacer" />
  <table>
    <thead>
      <tr class="border-bottom">
        <th />
        {#each ALL_EVIDENCE as evidence}
          <th
            class:selected={selected[evidence.short]}
            class:impossible={possibleEvidence.indexOf(evidence.short) === -1}
            on:click={() => toggle(evidence.short)}>
            {evidence.long}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each GHOSTS as ghost}
        <tr>
          <td class:impossible={possibleGhostNames.indexOf(ghost.name) === -1}>
            <span class="name-spacer">
              {ghost.name}
            </span>
            <SvelteTooltip tip={ghost.description} right>
              <Icon data={questionCircle} />
            </SvelteTooltip>
          </td>
          {#each ALL_EVIDENCE as evidence}
            <td
              class:selected={selected[evidence.short]}
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
    font-size: 120%;
  }

  h1 {
    text-align: center;
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
    border-bottom: 1px solid white;
  }

  td {
    text-align: center;
    padding: 1rem;
  }

  td:first-child {
    border-right: 1px solid white;
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

  .deselected {
    color: red;
  }

  .name-spacer {
    padding-right: 5px;
  }
</style>
