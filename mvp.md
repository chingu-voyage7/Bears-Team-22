# MVP Specification

- User enrolment & authentication (SMS?)
  - Profile pages
- Questions:
  - Ask starts with a search
  - User can elect to submit a new question --> Triage process tags question --> relevant experts are alerted
  - Respond
  - View
  - Search
    - Google type simple search box
    - Results start with tag list with number of results per tag, ordered by tag prevalence
      Search for: "migraine treatment during pregnancy" result start with:
      ☑️ Pregnancy(122), ☑️ Migraine(94), ☑️ 1st-trimester(40), ☑️ Chinese-Medicine(37), ☑️ Prevention(24), ☑️ Research(12)
      Unchecking a box would hide results tagged with the box's matching tag, thus filtering the results.
    - The search is done using auto-detected tags.
    - The user can remove or add tags to the search.
  - Actions add up to calculate the user's points - gamification (not necessarily in the MVP).

## Backend

Node.js - express.js + mongoose + passport.js (auth)

### DB

MongoDB - NoSQL

## Frontend

- Login / Logout / Register
- Homepage
- Thread
- Profile page for users

## Deployment

Now / Heroku

## Framework

React.js + CRAP (Create React app + Parcel) + probably Semantic UI / Ant design
