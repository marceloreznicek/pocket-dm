export const WILD_SHEEP_CHASE_PROMPT = {
  role: "assistant",
  content: `

{ The adventure is as follows
  "title": "The Silent Bell",
  "premise": "The town of Harrow’s Rest has been eerily silent for days. A mysterious church bell rings at midnight, but no one is seen pulling the rope. Those who hear the final toll vanish forever.",
  "acts": {
    "1": {
      "title": "Act 1 - The Silent Town",
      "description": "The players arrive in Harrow’s Rest, a village where everyone whispers, and the doors remain locked. They must investigate the church and the missing priest.",
      "key_events": [
        "Players meet Elsa Greaves, a terrified innkeeper who warns them about the midnight bell.",
        "Old Man Rowan, a blind beggar, mutters about 'the bell tolling for the wicked.'",
        "The bell tower is locked from the inside, and whispers echo through the air.",
        "If the players listen too long, they hear their own names being whispered."
      ],
      "trigger_for_next_act": "The players enter the bell tower."
    },
    "2": {
      "title": "Act 2 - The Tolling Curse",
      "description": "Inside the bell tower, the air is thick with dust, and shadows move where they shouldn’t. The bell begins to ring on its own.",
      "key_events": [
        "Players find scratch marks on the wooden floor leading to the bell tower stairs.",
        "The bell tolls three times as the players enter.",
        "Echo-Wraiths (distorted shadows of past victims) attack.",
        "Players learn that Father Aldric is trapped inside the bell’s reflection."
      ],
      "trigger_for_next_act": "The players step into the cursed shadow realm."
    },
    "3": {
      "title": "Act 3 - The Realm of Echoes",
      "description": "The players enter a mirror-world where time is frozen. Father Aldric is trapped beneath the spectral bell.",
      "key_events": [
        "The Spirit of Echoes, a ghostly figure with a cracked bell for a head, speaks in many voices.",
        "It offers the players a choice: silence the bell forever or destroy it at great cost.",
        "If they fail, the bell tolls six times, and Harrow’s Rest disappears forever."
      ],
      "possible_outcomes": {
        "silence_the_bell": "The town is saved, but one player permanently loses their voice.",
        "destroy_the_bell": "Reality distorts, causing strange anomalies.",
        "fail": "The town vanishes, leaving an empty field where it once stood."
      }
    }
  },
  "npc_list": {
    "Elsa Greaves": "Terrified innkeeper who warns about the midnight bell.",
    "Old Man Rowan": "A blind beggar who whispers cryptic warnings.",
    "Father Aldric": "Missing priest, last seen entering the bell tower.",
    "Spirit of Echoes": "The entity bound to the bell, seeking to complete the curse."
  },
  "rules": {
    "act_tracking": "Track which act the players are in and adjust responses accordingly.",
    "flat_rolls": "Do not ask for rolls. Instead, insert results as: [Rolled 10+ - Success], [Rolled 7-9 - Partial Success], [Rolled 6- - Failure].",
    "narrative_structure": "Every response should follow: acknowledge action → narrate outcome → escalate tension → present next choice."
  }
}`
};
