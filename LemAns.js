// How many total commits were made in all of Steve's events?

//where are commits found? How deeply are they nested?
//in an event object, object.payload.commits is an array of the commits for that event

let totalCommits = 0;

githubData.forEach(SteveEventObject => {
  if (SteveEventObject.type == "PushEvent") {
    totalCommits += SteveEventObject.payload.commits.length;
  }
})
console.log('total commits:', totalCommits);
let Q1 = document.getElementById('Q1');
let A1 = document.createElement("p")
A1.textContent = `There were ${totalCommits} total commits made in all of Steve's events!`
Q1.appendChild(A1);

// How many of each event type are there?(PullRequestEvent, PushEvent, etc)
//well first what are the event types?
//how can I find out? (just log them and look, or else use a loop to build an array?)
//then how can I store them?

let typesTotals = {
  PullRequestEvent: 0,
  PushEvent: 0,
  IssueCommentEvent: 0,
  DeleteEvent: 0,
  CreateEvent: 0
}

githubData.forEach(steveEvent => {
  typesTotals[steveEvent.type] += 1;
})
console.log('type totals:', typesTotals);

let Q2 = document.getElementById('Q2');
let A2 = document.createElement("p")
A2.textContent = "Here are the numbers for each of the event types: "
for (key in typesTotals) {
  A2.textContent += `${typesTotals[key]} of ${[key]}s. `
}
Q2.appendChild(A2);

// List all Github users who submitted a pull request that was approved by Steve.
//how do I know what users were approved?
// if it is a PullRequestEvent, that is an approved change by Steve.
//payload -> pullrequest -> user -> login?

//can I see if an array includes a thing already? woo! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

let approvedUsers = [];

githubData.forEach(Stevent => {
  if (Stevent.type === "PullRequestEvent") {
    // console.log('checkin data', Stevent.payload.pull_request.user.login);
    if (!approvedUsers.includes(Stevent.payload.pull_request.user.login)) {
      approvedUsers.push(Stevent.payload.pull_request.user.login)
    }
  }
})

console.log('approved user array:', approvedUsers);

let Q3 = document.getElementById('Q3');
let A3 = document.createElement("ul")
A3.innerHTML = "";
let userlistitemsArr = approvedUsers.map(user => `<li>${user}</li>`)
let userLis = userlistitemsArr.join(" ");
A3.innerHTML +=userLis;

Q3.appendChild(A3);

// List all repositories on which Steve had an event, and show how many events were on each one.
//Each event has a repo, which contains a name

//this will work similarly to the types totals.

let reposEventTotals = {
  "nashville-software-school/client-side-mastery": 0,
  "nashville-software-school/bangazon-llc": 0,
  "stevebrownlee/vps-setup": 0,
  "nss-day-cohort-27/brenda-snack-cake-store": 0
}

githubData.forEach(githubEvent => {
  reposEventTotals[githubEvent.repo.name] += 1;
})
console.log('repo event totals', reposEventTotals);

let Q4 = document.getElementById('Q4');
let A4 = document.createElement("p")
A4.textContent = "Here are the numbers of each of the event types: "
for (key in reposEventTotals) {
  A4.textContent += `${reposEventTotals[key]} in ${[key]}. `
}
Q4.appendChild(A4);

// Which event had the most number of commits ?
//I think this means which single event, since the only type with commits is PushEvent.
let eventCommitTotals = {

}

githubData.forEach(stevent => {
  if (stevent.type === "PushEvent") {

    eventCommitTotals[stevent.type + stevent.id] = stevent.payload.commits.length;
  }
})

console.log('each event and its commits', eventCommitTotals);

//   Which programming langugages were affected by Steve's events?

//looks like language is in repo? nope.
//in repo in pull_request only in PR events.. whew! TOOK FOREVER!
//NOPE STILL. base.repo

let steventLangs = {
  Python: 0,
  JavaScript: 0
}

githubData.forEach(steve => {
  if (steve.type === "PullRequestEvent")
    // console.log(steve.payload.pull_request.base.repo.language);
  steventLangs[steve.payload.pull_request.base.repo.language] += 1
})

console.log('Steve event languages', steventLangs);
// What programming language was the most affected by Steve's events?