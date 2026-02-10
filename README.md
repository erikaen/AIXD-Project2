# Bumble Pulse
This vibe-coded project is made with V0 and Claude Code. UI revisions with [Impeccable](https://impeccable.style/#hero).
## Project Definition
### Project Goals
Launch a precise location-based notification system across all platforms (mobiles, desktop, and watch).
Increase conversion rate of existing non-paying users to premium/premium+ subscribers by notifying them of matches based on precise location proximity (within 10 seconds). 
Increase user engagement measured by usage frequency, location, and social drivers for users who choose precise location services.
Attracts new users in all Bumble categories (Dating, BFF, Bizz), especially BFF and Bizz who want to expand social circles and career development.
Enable data capture and analysis to identify subscription conversion inhibitors, app abandonment points, and idle user behaviors.
Gain actionable insights into the behavioral patterns (usage frequency, location context, and social drivers) that correlate with subscription conversion.

### Project Design Brief
[Bumble Pulse](https://docs.google.com/document/d/17l3uNp1pk-WWyF4nVS0_FfL2BygdXGM7LKkBcFYpLqY/edit?usp=sharing)

# Important
Remember everytime when creating new version, Keep main stable                                                              
                                                                                
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

## Claude Version 1 Resume Code
claude --resume 59fd2d67-7d46-4ec7-ae64-846cf199dab9
