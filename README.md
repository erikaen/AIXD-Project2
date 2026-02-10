# Bumble Pulse
This project is made with V0 and Claude Code. UI revisions with [Impeccable]([URL](https://impeccable.style/#hero)).
## Project Defiition
### Project Goals
Launch a precise location-based notification system across all platforms (mobiles, desktop, and watch).
Increase conversion rate of existing non-paying users to premium/premium+ subscribers by notifying them of matches based on precise location proximity (within 10 seconds). 
Increase user engagement measured by usage frequency, location, and social drivers for users who choose precise location services.
Attracts new users in all Bumble categories (Dating, BFF, Bizz), especially BFF and Bizz who want to expand social circles and career development.
Enable data capture and analysis to identify subscription conversion inhibitors, app abandonment points, and idle user behaviors.
Gain actionable insights into the behavioral patterns (usage frequency, location context, and social drivers) that correlate with subscription conversion.

### Problem to Be Solved
Currently, most Bumble users are non-paying (~ 50 million), and notifications about potential matches do not leverage high-precision and real-time location data. Users may miss nearby matches or receive delayed alerts, which reduces engagement and conversion potential.
The challenge is to design a multi-platform, timely, relevant, and opt-in notification system that encourages users who particularly seek spontaneous, in-person connections to act on nearby matches (within .5 kilometers) while maintaining user trust and app safety.

### Business Goals
Increase revenue through higher premium subscription conversion.
Attract and Increase overall app engagement metrics across all platforms, capitalizing on the known correlation between enabled location services and longer session times.
Support expansion of BFF and Bizz user categories to increase user lifetime value and market growth.
Collect actionable insights on user behavior to inform future product iterations and growth strategies.
Enhance the value proposition by offering a feature that facilitates real-world connections more efficiently than competitors, potentially increasing market share.

### Target Users
#### Primary Users: 
Existing non-paying users who choose location services (~ 50 million).
Assumed Detail: A significant segment of these users are open to spontaneous meetings and value efficiency in making local connections.

#### Secondary Users (assumptions): 
New users signing up for Bumble for social (BFF) or professional (Bizz) networking. 
Assumed Detail: These users may have different proximity sensitivity and notification preferences than dating-focused users.

#### Tertiary Users (assumptions): 
Existing paying subscribers (2.4 million).
Assumed Detail: This feature must also provide value or not degrade the experience for this group, as it is a core revenue source.

#### Noted Assumption: 
The brief states “90% of which are under 35 years of age,” but it’s ambiguous whether this refers to all non-paying users or the target segment for this feature. I treat it as a general characteristic of the non-paying cohort.

### Competitors
#### Traditional (direct competitors): 
Tinder, Hinge, eHarmony, OK Cupid, Badoo, Raya (for dating)
LinkedIn (for Bizz mode).

#### Non-traditional (adjacent or substitute solutions): 
Other social discovery apps (e.g., Meetup, Friender).
General communication platforms (Instagram, Discord) for maintaining established friendships (BFF mode).
Real-world serendipity (in-person events, existing social circles).

### Assumptions Being Made
#### Product: 
Precise location notifications increase user engagement and conversion. Users will interact with notifications across multiple platforms consistently.

#### User: 
A user’s desire to connect increases with immediate physical proximity. A key reason for not subscribing is a lack of perceived immediate value, which this feature can address.

#### Technical: 
The required precision (< 0.5 km) can be reliably achieved across iOS, Android, and web using available networking tech (GPS, Wi-Fi, Bluetooth). Notifications can be delivered within ~10 seconds.

#### Market: 
Competitors are not already executing this precise, multi-platform notification strategy effectively. This feature will be a market differentiator.

#### Behavioral: 
Users who enable location services tend to have longer app sessions, implying an opportunity to leverage this behavior to drive conversion.

### Known Constraints
#### Technical:
Must work across native iOS, Android, desktop web, and Apple Watch.
Apple Watch interface must use minimal gestures, no motion, and no audio.
Must use existing design system components, no new UI patterns or tooltips.
Must be WCAG 2.0 AA compliant.
Must comply with GDPR, CCPA, and other data privacy regulations.
Must adhere to strict platform-specific guidelines for background location access and notifications (privacy, battery impact).
#### Business:
Presentation to stakeholders (Customer Acquisition Team, Director of Market Growth) is scheduled for Feb 26, 2026.
Future funding for development, testing, and support is contingent on this presentation's outcome.
#### User / Context-of-Use:
Privacy is paramount. The design must ensure clear, transparent user consent and control over location sharing and notification preferences.
Notifications must not create safety risks or social discomfort.
The experience must be cohesive and valuable across different devices and user modes (Date, BFF, Bizz).

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
