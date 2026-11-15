# WebLearn: Online Courses Website

WebLearn is an online courses website for the Web Technologies-1 course at Astana IT University. Students read the lectures, take a quiz and do live coding tasks after each lecture.

## Group members
1. Aidana Muratova
2. Zhasmira Mamyrbayeva
3. Khanzada Nyshanbek

## Short description
A responsive website made for the midterm, extended with JavaScript and jQuery interactivity for the endterm, and extended again with a theme toggle, sign-in, FAQ and a public API for the final project. It has ten lectures. Week 1 is HTML Basics, Week 2 is CSS, Week 3 is Flexbox and Grid, Week 4 is Bootstrap and Media Queries, Week 5 is Forms and Validation, Week 6 is JavaScript Basics, Week 7 is JavaScript DOM, Week 8 is jQuery, Week 9 is JavaScript Events and Objects and Week 10 is Asynchronous JavaScript. After each lecture the student takes the quiz for that lecture and then does live coding tasks. At the end there is a Final Test for all ten lectures.

Pages: Home, Lectures, Quiz with a hub and one quiz page for each lecture, Live Coding with a hub and one page for each of the lectures 1 to 9, Final Test, Topics with search and filter, Students with a CRUD table, Gallery with a lightbox, Register with a validated form, Developers, Contact with a thank-you page, and the final project pages Sign in, FAQ and Books with the public API. The website has 34 pages.

## Features implemented

### Midterm features
1. Header with logo and Flexbox navigation, footer with contacts, copyright and social links on every page
2. Hamburger menu on small screens
3. Semantic HTML5, a table for the lecture schedule and forms in the quizzes, live coding and contact
4. External CSS with variables, Flexbox, Grid, positioning, hover, focus and nth-child selectors
5. Responsive design with the Bootstrap grid, utility classes and media queries for tablet and mobile
6. Take the quiz and Live coding buttons after every lecture
7. Quizzes with theory and code questions. Check Answers shows correct answers in green, wrong choices in red and an explanation, made with CSS only using :checked and sibling selectors. Try again is a reset button
8. Live Coding with three tasks for each lecture, each with requirements, an expected result, a code box and a CSS only Show Solution button
9. Google Font Sora and lazy loading for images below the fold

## Endterm: what we added

The endterm project extends the midterm website, with the same topic and structure, by adding interactivity and dynamic behavior. All JavaScript and jQuery code is in js/script.js. jQuery 3.7.1 is loaded from the CDN and Bootstrap 5.3 JS is used for modals. All midterm pages, the responsive layout and the CSS only quizzes remain intact.

### 1. Form validation: register.html and contact.html
Forms use the js-validate class and novalidate, so all checking is done by our own JavaScript before submission.
1. Required fields: name, email, password, confirm password, message and the accept terms checkbox. An empty field shows its own message, for example Email is required.
2. Name check with RegEx: letters only, including Latin, Cyrillic and Kazakh letters, spaces, hyphen and apostrophe, at least 2 characters.
3. Email check with RegEx: the address must look like name@mail.com, otherwise a hint with an example is shown.
4. Password rules: at least 8 characters, and a password that is too weak is rejected with the advice to add digits, capital letters or symbols.
5. Password strength indicator: a Bootstrap progress bar and a text label show Weak in red, Medium in yellow or Strong in green. The score depends on the length of 8 and 12 characters, small and capital letters, digits and symbols. It updates on every key press.
6. Password confirmation: the second field must match the first one. If the user changes the password after filling in the confirmation, the confirmation is checked again automatically.
7. A Show and Hide button for both password fields.
8. Message field in the contact form: required, at least 10 characters.
9. Real time feedback: fields are validated on input, blur and change. Each field gets the Bootstrap classes is-valid or is-invalid, a green ✓ or red ✗ icon and a text message under the field, either Looks good or the error.
10. Blocking submission: if any field is invalid, preventDefault stops the form, a Bootstrap alert fades in with the list of fields to fix, and the focus moves to the first wrong field.
11. After success: the register form shows a success alert with the user's name, inserted safely as text, and resets itself. The contact form is sent to thank-you.html.

### 2. Dynamic search and filter: topics.html
1. The page has 36 topic cards about HTML, CSS, Flexbox and Grid, Bootstrap, JavaScript and jQuery, from lecture 1 to lecture 10.
2. Real time search: results change while the user types, using the input and keyup events, without reloading the page. The search is case insensitive and looks in the card title, the description and hidden tags.
3. Category buttons: All, HTML, CSS, Flexbox and Grid, Bootstrap, JavaScript and jQuery. They work together with the search bar, so a card is shown only if it matches both the text and the category.
4. Cards appear and disappear with the jQuery .fadeIn and .fadeOut effects.
5. A result counter, for example 5 topics found, and a Nothing found message when there are no matches.
6. A Clear button resets the search and returns the focus to the input.

### 3. Dynamic table with CRUD: students.html
A student list with name, email, current lecture and quiz score, built with jQuery.
1. Read: the table is drawn dynamically from a JavaScript array and 5 demo students are loaded at the start. The score is shown in a colored badge: 90 and above is high, 70 to 89 is medium, below 70 is low. The page also shows the total number of students and the average score.
2. Create: the Add student button opens a Bootstrap modal with a form for name, email, lecture and a score from 0 to 100.
3. Update: the Edit button opens the same modal filled with the data of the chosen row.
4. Delete: the Delete button opens a confirmation modal with the student's name. After confirmation the row fades out and is removed.
5. Validation inside the modal: name and email use RegEx, the score must be a number from 0 to 100, and errors are shown live under the fields.
6. Feedback: a Bootstrap alert appears after each action, Student added, Student updated or Student deleted.
7. localStorage: the data stays after the page is reloaded. The Reset demo data button restores the original list. If the list is empty, a message is shown.

### 4. Image gallery with lightbox: gallery.html
1. A grid of images about HTML, CSS, JavaScript, Bootstrap and jQuery with captions and a hover zoom effect.
2. Category filter buttons All, HTML, CSS, JavaScript, Bootstrap and jQuery with fade transitions.
3. Lightbox: a click on an image opens it in large size with a caption and a counter such as 2 / 5.
4. Navigation arrows, previous and next, that go around in a circle. The keyboard arrows ← → and Esc also work, and clicking outside the image closes the lightbox. When a filter is active, the arrows move only through the visible images.
5. jQuery effects: the lightbox opens with .fadeIn, and the image changes with .fadeOut and .fadeIn. The page scroll is locked while the lightbox is open.
6. Developers page, developers.html: a similar lightbox for the team photos, with filtering by developer and an .animate effect where the photo fades in and slides up.

### 5. Final Test: final-test.html
1. 30 questions, 3 for each of the ten lectures, with theory and code.
2. Check Answers shows correct answers, wrong choices and explanations. jQuery counts the score and shows it in percent with the message Well done, you passed when the pass mark of 70% is reached, or Review the lectures and try again. The page scrolls smoothly to the result with .animate.
3. Try again resets the test and hides the score.

### 6. New content
1. Lectures 5 to 10: Forms and Validation, JavaScript Basics, JavaScript DOM, jQuery, JavaScript Events and Objects and Asynchronous JavaScript. They have their own quizzes, quiz-week5.html to quiz-week10.html, and live coding tasks for the lectures 5 to 9, live-coding-week5.html to live-coding-week9.html.
2. The navigation on every page has new links: Final Test, Topics, Students, Gallery, Register and Developers.
3. The Topics page has new JavaScript and jQuery categories.

## Final project: what we added

The final project continues the same website. We did not create a new project: the structure, design and all earlier features stay the same. The new code is in js/script.js and css/style.css. The navigation on every page has two new links, FAQ and Books, and a Dark and Light button and a Sign in and Sign out area are added to the navigation bar automatically by JavaScript, so they appear on all 34 pages.

### Links
1. Deployed website on GitHub Pages: https://muratovaajdana201-ctrl.github.io/wenlearn-midtermmm/
2. GitHub repository: https://github.com/muratovaajdana201-ctrl/wenlearn-midtermmm

### 1. Light and Dark theme on all pages
1. A Dark and Light button in the navigation bar on every page.
2. The theme is set with the data-theme attribute on the html element and the data-bs-theme attribute for Bootstrap components. The dark colors are in css/style.css.
3. The chosen theme is saved in localStorage with the key weblearn-theme and is applied again when the page is loaded, so it stays after a refresh and is the same on all pages.

### 2. Sign-in with localStorage: signin.html
1. The form has the fields name, email and password. It uses the same js-validate validation as the register form: required fields, RegEx for the name and the email, a password of at least 6 characters, and errors shown live under the fields.
2. After a successful sign-in the name and email are saved in localStorage with the key weblearn-user. The password is never saved.
3. The user stays signed in after a refresh and on all other pages.
4. Signed-in interface: the navigation shows the user's name and a Sign out button, the Register link is hidden, the home page shows a Welcome back message with the name, and signin.html shows a welcome box instead of the form.
5. Sign out removes the saved data from localStorage and the interface returns to the signed-out view.

### 3. FAQ with jQuery: faq.html
1. 6 questions about the website: lectures, quizzes, live coding, Final Test, sign-in and dark theme.
2. A click on a question opens or closes the answer with the jQuery .slideToggle effect, which gives a smooth sliding animation of 300 milliseconds.
3. A visual indicator shows + when the answer is closed and minus when it is open, and the open item also gets a blue border.

### 4. Public API with Open Library books: books.html
1. The page loads books from the public Open Library API: https://openlibrary.org/search.json. No API key is needed. The cover images come from covers.openlibrary.org.
2. The data is requested with fetch, converted from JSON and shown dynamically as cards with the cover, title, authors, the first publication year, the number of editions and a link to the book on Open Library.
3. User interaction: a search form where the user chooses to search everything, by title, by author or by subject and types a word. The request is sent when the user presses Search or Enter, so the server is not called on every key press. Quick topic buttons for JavaScript, HTML, CSS, jQuery and Web design start a search with one click.
4. Filtering and sorting on the loaded data: the Only books with a cover checkbox, and sorting by best match, newest first, oldest first or most editions.
5. Error handling: a loading message, a check of response.ok, a check of the data format, a message when nothing is found, a message when the search word is empty and a .catch with a red message if the request fails. The Search button is disabled while loading.
6. The texts from the API are inserted with .text, so no HTML from the server is executed.

### 5. Lecture 10 and the Final Test
1. Lecture 10 Asynchronous JavaScript in lectures.html: synchronous and asynchronous code, the event loop, microtasks and tasks, callbacks, Promises, async and await, fetch and JSON.
2. quiz-week10.html: 11 questions, 8 on theory and 3 on code, with the same Check Answers behavior as the other quizzes. The Quiz hub has a new card for Week 10.
3. The Final Test has 3 new questions about lecture 10 and now has 30 questions.

### 6. Requirements of the final project
1. 5 or more pages and a navigation bar on every page: 34 pages, and all links work.
2. HTML and CSS: semantic HTML5, external CSS, Flexbox and Grid and a responsive layout. Because the menu now has 12 links, the hamburger menu is used on screens narrower than 1280 px.
3. JavaScript: theme toggle and sign-in with localStorage. jQuery: FAQ with .slideToggle. API: fetch with search, sorting, refresh and error handling on the Books page.

### 7. Fixes
1. live-coding-week3.html had an old navigation with 5 links and no scripts. It now has the same navigation and scripts as the other pages.
2. The footer e-mail in register.html had Cyrillic letters instead of com. It is fixed.
3. index.html and lectures.html had an old navigation without the FAQ and Books links, and lectures.html also had no Final Test link. Now all 34 pages have the same navigation with 12 links.

## Technologies used
HTML5, CSS3, Bootstrap 5.3, JavaScript ES6, jQuery 3.7.1, Fetch API and the public Open Library API, Regular Expressions, localStorage, Google Fonts, Git and GitHub, GitHub Pages

AI usage: AI tools (Claude by Anthropic) were used as a supporting tool during development. This is also credited in the footer of the website.

## Individual contributions

### Khanzada Nyshanbek
1. Quizzes for all ten lectures: quiz.html as the hub, and quiz-week1.html to quiz-week10.html
2. index.html
3. css/style.css
4. final-test.html with the jQuery score counter and 30 questions
5. students.html with the dynamic table, CRUD operations and modals
6. Final project: books.html with the Open Library API, with fetch, search, sorting and error handling

### Aidana Muratova
1. Lectures 1 to 10: lectures.html with the lecture text and the lecture schedule table
2. register.html with the registration form
3. topics.html with real time search and the category filter
4. contact.html and thank-you.html with the contact form and the confirmation page
5. Final project: signin.html with the sign-in form, validation, localStorage login state, signed-in interface and Sign out

### Zhasmira Mamyrbayeva
1. Live Coding tasks: live-coding.html as the hub, and live-coding-week1.html to live-coding-week9.html
2. gallery.html and img/gallery/ with the image gallery and lightbox
3. developers.html and img/developers/
4. Final project: the Light and Dark theme toggle with the button, dark theme CSS and localStorage, and faq.html with the jQuery .slideToggle accordion

### Shared work
1. js/script.js was written by all group members together: form validation, search and filter, CRUD table, gallery and lightbox, final test score, and the final project code for theme, sign-in, FAQ and the API.
2. The new navigation links FAQ and Books on all pages, the fixes and this README.
