Project: Dev Detective — GitHub User Search  
Week: 3 | Level: Intermediate (Level 2)  
Intern: Tadigadapa Harsha Vardhan  

This file is just a note of the prompts I used while building this project and what I understood from them.

1. Fetching GitHub user data

My Prompt: "How do I fetch GitHub user data using JavaScript fetch API?"

Why I asked: I wasn't very comfortable with APIs in the beginning. I just wanted to understand how to send a request using a username and get the data back.

What I learned: I got a basic understanding of how fetch works and how async/await makes it easier to handle responses. Also understood that we need to convert the response using .json() before using it.

2. Displaying data in UI

My Prompt: "How do I display fetched API data in HTML using JavaScript?"

Why I asked: I could see everything in the console, but didn't know how to actually show it on the page.

What I learned: I used document.getElementById and textContent to update values. At first it didn't work properly because I was targeting the wrong elements in a few places.

3. Fetching repositories

My Prompt: "How to fetch repositories of a GitHub user using repos_url?"

Why I asked: After showing user details, I wanted to display repositories as well.

What I learned: I understood that the API itself provides a repos_url, so I didn't need to manually create another endpoint.

4. Limiting repositories

My Prompt: "How do I show only latest 5 repositories?"

Why I asked: Showing all repositories made the UI look cluttered.

What I learned: I used query parameters like ?sort=updated&per_page=5. This was new for me — I didn't know APIs support filtering like this.

5. Loading state

My Prompt: "How to show loading state while fetching API data?"

Why I asked: There was a small delay and nothing showed on screen, which didn't feel right.

What I learned: I added a simple spinner and message using innerHTML so the user gets feedback while data is loading.

6. Error handling

My Prompt: "How to handle API errors like user not found?"

Why I asked: The app was breaking when I entered an invalid username.

What I learned: I learned to check response status and handle 404 errors properly using try/catch instead of letting the app fail.

7. Clearing previous data

My Prompt: "How to clear previous results before new search?"

Why I asked: When I searched again, previous data was still visible for a moment.

What I learned: I cleared the UI before making a new request. It's a small thing but it made the app feel much cleaner.

Things I changed myself after reviewing

. Used template literals instead of string   concatenation
. Cleared repo list before rendering new data
. Added rel="noopener noreferrer" for external links
. Simplified some parts instead of keeping unnecessary  logic
. Adjusted spacing slightly to improve UI
. Made sure I understood what each function is doing

Overall, this project helped me understand how APIs are used in real applications. It also improved my confidence in async JavaScript and handling dynamic UI updates.