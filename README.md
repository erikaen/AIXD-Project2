# Bumble Pulse
This vibe-coded project is made with V0 and Claude Code. UI revisions with [Impeccable](https://impeccable.style/#hero).
Live page at [Bumble Pulse](https://erikaen.github.io/AIXD-Project2/)

### Why Claude Code?
Recreating a design system as specific as Bumble’s requires deep "visual" memory. Claude Code excels at following a strict tailwind.config.js to ensure the Yellow/Black palette is globally consistent. Since Bumble Pulse is implementing a complex 0.5km radius Map logic and Apple Watch sync, Claude Code can run local servers, identify why a map isn't rendering, and fix it without copy-pasting errors.

# Project Definition
## Project Description
A proximity-based Bumble extension designed to bridge the gap between digital matching and real-world connection. It features 45-minute "Live Map" sessions with "Frosted" privacy controls, streamlined spot selection, one-tap meeting coordination, and watch navigation.
## Core Features

- **Hero Interface:**
A real-time map with a 0.5km radius circle. Includes "Frosted Glass" profile pins that reveal details only upon a mutual "Wave."

- **Session Management:**
A "Go Live" toggle that initiates a 45-minute active session. Includes a persistent HUD timer and "Cancel Anytime" functionality.

- **The Handshake (Simplified Meet):**
A lead-driven invitation system for Bumble that streamlines real-world meetings by allowing users to propose venues and times for interactive requests that support one-tap acceptance, flexible counter-proposals, and automatic 24-hour expiration.

- **Apple Watch Navigation:**
Sync with watch GPS to guide users to each other.

[Design Brief](https://docs.google.com/document/d/17l3uNp1pk-WWyF4nVS0_FfL2BygdXGM7LKkBcFYpLqY/edit?usp=sharing)

# Important
Remember everytime when creating new version, keep main stable                                                              
                                                                                
  main should always be your working/deployable version.                        
                                                                                
  Use feature branches for new work                                             

  git checkout -b feature/new-feature    # create a branch
  #... make your changes ...
  git add .
  git commit -m "add new feature"
  git push -u origin feature/new-feature

  When it's ready, merge it back:
  git checkout main
  git merge feature/new-feature
  git push

## Common branch naming
  - feature/live-chat — new functionality
  - fix/broken-images — bug fixes
  - experiment/new-layout — things you might throw away

## Quick tips
  - Commit often with clear messages — makes it easy to undo mistakes
  - Want to undo something? git log to find the commit, git revert <hash> to
  safely undo it
  - Want to save work-in-progress? git stash saves uncommitted changes, git
  stash pop brings them back
  - Want a snapshot before a big change? git tag v1.0 marks a point you can
  always return to

## The "Emergency" Recovery Plan
If a revision breaks the app, I will follow these three levels of recovery based on the severity of the issue:

### Level 1: The "Atomic" Rollback (Local, Uncommitted Mess)
If Claude generates code that doesn't work but hasn't been committed yet:
- **Action:** git checkout -- . or git restore .
- **Why:** This instantly wipes the AI's recent changes and returns the files to the last clean "committed" state.
AI Instruction: I will tell Claude: "That didn't work and broke the [Component]. I’ve restored the files; let's try a different approach focusing on [Specific Logic]."

### Level 2: The "Time Machine" (Bad Commit)
If the "bad" code was already committed to a feature branch:
- **Action:** git reset --hard HEAD~1
- **Why:** This deletes the most recent commit and moves the branch back one step in time as if the mistake never happened.

### Level 3: The "Nuclear" Option (Branch Failure)
If a feature branch becomes so messy or "hallucinated" that it’s unfixable:
- **Action:** git checkout main and git branch -D feature/broken-feature
- **Why:** Since main is always kept stable/deployable, I can safely delete the broken experiment and start a fresh feature branch from a clean slate.

## Claude Version 1 Resume Code
claude --resume 59fd2d67-7d46-4ec7-ae64-846cf199dab9

## Claude Resume Code
claude --resume
