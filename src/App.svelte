<script>
  import { onMount } from "svelte";
  import SvelteTooltip from "svelte-tooltip";
  import Icon from "svelte-awesome";
  import { questionCircle } from "svelte-awesome/icons";
  import {
    ALL_EVIDENCE,
    GHOSTS,
    MOUSE_LEFT,
    MOUSE_RIGHT,
    SELECTED,
    NOT_SELECTED,
    IGNORED,
  } from "./data.js";
  import { toggleSelection, ghostMatches } from "./util";

  let selected = {};

  const toggle = (evidence, button) => {
    selected[evidence] = toggleSelection(selected, evidence, button);
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
      selected[e.short] = NOT_SELECTED;
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
            class:impossible={possibleEvidence.indexOf(evidence.short) === -1}
            class:selected={selected[evidence.short] === SELECTED}
            class:deselected={selected[evidence.short] === IGNORED}
            on:click={() => toggle(evidence.short, MOUSE_LEFT)}
            on:contextmenu|preventDefault={() =>
              toggle(evidence.short, MOUSE_RIGHT)}>
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
              class:selected={selected[evidence.short] === SELECTED}
              class:deselected={selected[evidence.short] === IGNORED}
              on:click={() => toggle(evidence.short, MOUSE_LEFT)}
              on:contextmenu|preventDefault={() =>
                toggle(evidence.short, MOUSE_RIGHT)}>
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
    color: rgb(72, 170, 69);
  }

  .deselected {
    color: rgb(119, 49, 49);
  }

  .name-spacer {
    padding-right: 5px;
  }
</style>
