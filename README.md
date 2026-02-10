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

  Common branch naming

  - feature/live-chat — new functionality
  - fix/broken-images — bug fixes
  - experiment/new-layout — things you might throw away

  Quick tips

  - Commit often with clear messages — makes it easy to undo mistakes
  - Want to undo something? git log to find the commit, git revert <hash> to
  safely undo it
  - Want to save work-in-progress? git stash saves uncommitted changes, git
  stash pop brings them back
  - Want a snapshot before a big change? git tag v1.0 marks a point you can
  always return to

Claude Version 1 Resume Code: claude --resume 59fd2d67-7d46-4ec7-ae64-846cf199dab9
