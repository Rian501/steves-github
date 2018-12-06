// How many total commits were made in all of Steve's events?
//where are commits in this massive data set?
//are they in arrays? How can I count them?
//commits is array inside payload

let commitsTotal = 0;

githubData.forEach(steveEvent => {
  if (steveEvent.type === "PushEvent") {
    commitsTotal += steveEvent.payload.commits.length;
  }
})

console.log('Total Commits!', commitsTotal);

// How many of each event type are there?(PullRequestEvent, PushEvent, etc)
// What are the event types? 

// console.log(githubData);

let eventTypes = {
  PushEvent: 0,
  PullRequestEvent: 0,
  IssueCommentEvent: 0,
  DeleteEvent: 0,
  CreateEvent: 0,
}

eventTypes.songs = 0;

githubData.forEach(stevent => {
  eventTypes[stevent.type] += 1;
})

console.log("event types and their totals", eventTypes);

// List all Github users who submitted a pull request that was approved by Steve.
//what? how do I know who was approved by Steve?
//payload -> pull_request -> user -> login
let approvedUsers = [];

//can I make sre I'm only adding a string to an array if it's not already in there?

githubData.forEach(literallyAnything => {
  if (literallyAnything.type === "PullRequestEvent") {
    if (!approvedUsers.includes(literallyAnything.payload.pull_request.user.login)) {
      approvedUsers.push(literallyAnything.payload.pull_request.user.login);
    }
  }
})

console.log('approved users:', approvedUsers);

// List all repositories on which Steve had an event, and show how many events were on each one.
//how to target repos? Where nested? 
//probably like the one with the types --create an object with the keys

let reposEvents = {
  "nashville-software-school/bangazon-llc": 0,
  "nss-day-cohort-27/brenda-snack-cake-store": 0,
  "nashville-software-school/client-side-mastery": 0,
  "stevebrownlee/vps-setup": 0
}

githubData.forEach(eventObj => {
  // console.log('repo name', eventObj.repo.name);
  reposEvents[eventObj.repo.name] ++;
})

console.log('repos and their events', reposEvents);


// Which event had the most number of commits ?
//objects with specific event as key and commits.length as value
let eventsCommits = {}

githubData.forEach(githubEvent => {
  if (githubEvent.type === "PushEvent") {
    console.log("The event id as string", githubEvent.id, "commits length", githubEvent.payload.commits.length)
    eventsCommits[githubEvent.id] = githubEvent.payload.commits.length;
  }
})

console.log('events and their commits', eventsCommits);

// Which programming langugages were affected by Steve's events?

// payload -> pull_request ->  head -> repo -> langauge
githubData.forEach(stevent => {
  if (stevent.type === "PullRequestEvent") {
    console.log('language?', stevent.payload.pull_request.base.repo.language);
  }
})

// What programming language was the most affected by Steve's events?