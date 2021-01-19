export const ALL_EVIDENCE = [
  { short: "emf", long: "EMF 5" },
  { short: "fingerprints", long: "Fingerprints" },
  { short: "freezing", long: "Freezing" },
  { short: "orbs", long: "Ghost Orbs" },
  { short: "writing", long: "Book writing" },
  { short: "box", long: "Spirit Box" },
];

export const GHOSTS = [
  {
    name: "Spirit",
    description:
      "Smudge Sticks will prevent it from attacking for a long time.",
    evidence: {
      box: true,
      fingerprints: true,
      writing: true,
      orbs: false,
      emf: false,
      freezing: false,
    },
  },
  {
    name: "Wraith",
    description:
      "Usually flies, including through walls/lockers/doors. Toxic reaction to salt.",
    evidence: {
      box: true,
      fingerprints: true,
      writing: false,
      orbs: false,
      emf: false,
      freezing: true,
    },
  },
  {
    name: "Phantom",
    description:
      "Looking at it will cause large sanity loss. Taking a photo of it will cause it to temporarily disappear.",
    evidence: {
      box: false,
      fingerprints: false,
      writing: false,
      orbs: true,
      emf: true,
      freezing: true,
    },
  },
  {
    name: "Poltergeist",
    description: "Interacts with many items at a time.",
    evidence: {
      box: true,
      fingerprints: true,
      writing: false,
      orbs: true,
      emf: false,
      freezing: false,
    },
  },
  {
    name: "Banshee",
    description:
      "Targets a single person at a time. Will be less aggressive near Crucifixes.",
    evidence: {
      box: false,
      fingerprints: true,
      writing: false,
      orbs: false,
      emf: true,
      freezing: true,
    },
  },
  {
    name: "Jinn",
    description:
      "Territorial & fast. Faster when target is far away and power supply is on.",
    evidence: {
      box: true,
      fingerprints: false,
      writing: false,
      orbs: true,
      emf: true,
      freezing: false,
    },
  },
  {
    name: "Mare",
    description: "Increased chance to attack in the dark.",
    evidence: {
      box: true,
      fingerprints: false,
      writing: false,
      orbs: true,
      emf: false,
      freezing: true,
    },
  },
  {
    name: "Revenant",
    description: "Very fast when hunting; slows greatly when being hid from.",
    evidence: {
      box: false,
      fingerprints: true,
      writing: true,
      orbs: false,
      emf: true,
      freezing: false,
    },
  },
  {
    name: "Shade",
    description:
      "Very shy. Will not start a hunt when multiple people are nearby.",
    evidence: {
      box: false,
      fingerprints: false,
      writing: true,
      orbs: true,
      emf: true,
      freezing: false,
    },
  },
  {
    name: "Demon",
    description:
      "Aggressive, and attacks more often. Asking a successful question via Ouija board will not lower sanity.",
    evidence: {
      box: true,
      fingerprints: false,
      writing: true,
      orbs: false,
      emf: false,
      freezing: true,
    },
  },
  {
    name: "Yurei",
    description:
      "Drains sanity faster than other ghosts. Smudging its room prevents roaming for a long time.",
    evidence: {
      box: false,
      fingerprints: false,
      writing: true,
      orbs: true,
      emf: false,
      freezing: true,
    },
  },
  {
    name: "Oni",
    description:
      "More active when around multiple people. Can rapidly move items.",
    evidence: {
      box: true,
      fingerprints: false,
      writing: true,
      orbs: false,
      emf: true,
      freezing: false,
    },
  },
];

export const ghostMatches = (ghost, evidence) => {
  for (const e of evidence) {
    switch (e) {
      case "box": {
        if (!ghost.evidence.box) {
          return false;
        }
        break;
      }
      case "fingerprints": {
        if (!ghost.evidence.fingerprints) {
          return false;
        }
        break;
      }
      case "writing": {
        if (!ghost.evidence.writing) {
          return false;
        }
        break;
      }
      case "orbs": {
        if (!ghost.evidence.orbs) {
          return false;
        }
        break;
      }
      case "emf": {
        if (!ghost.evidence.emf) {
          return false;
        }
        break;
      }
      case "freezing": {
        if (!ghost.evidence.freezing) {
          return false;
        }
        break;
      }
    }
  }
  return true;
};
