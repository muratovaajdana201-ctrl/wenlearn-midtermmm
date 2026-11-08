# WebLearn: Online Courses Website

## Project title and topic
**WebLearn** is an online courses website for the Web Technologies-1 course at Astana IT University. Students read the lectures, take a quiz and do live coding tasks after each lecture.

## Group members
-Aidana Muratova
-Zhasmira Mamyrbayeva
-Khanzada Nyshanbek

## Short description
A responsive website (midterm) extended with JavaScript and jQuery interactivity (endterm). It has **nine lectures**: Week 1 (HTML Basics), Week 2 (CSS), Week 3 (Flexbox and Grid), Week 4 (Bootstrap and Media Queries), Week 5 (Bootstrap Grid and Components), Week 6 (JavaScript Basics), Week 7 (Arrays, Loops and DOM Manipulation), Week 8 (JS Events and Form Validation) and Week 9 (jQuery). After each lecture the student takes the quiz for that lecture and then does three live coding tasks for that lecture. At the end there is a **Final Test** for all nine lectures.

Pages: Home, Lectures, Quiz (hub + one quiz page per lecture), Live Coding (hub + one page per lecture), **Final Test** (27 questions with a score), **Topics** (search and filter), **Students** (CRUD table), **Gallery** (lightbox), **Register** (validated form), Contact (+ thank-you page).

## Features implemented
-Header with logo and Flexbox navigation, footer with contacts, copyright and social links on every page
-Hamburger menu on small screens
-Semantic HTML5, a table (lecture schedule) and forms (quizzes, live coding, contact)
-External CSS with variables, Flexbox, Grid, positioning, :hover, :focus, :nth-child()
-Responsive design: Bootstrap grid and utility classes, media queries for tablet and mobile
-"Take the quiz" and "Live coding" buttons after every lecture that open the quiz and the coding tasks for that lecture
-Quizzes with theory and code questions; **Check Answers** shows the correct answers (green), wrong choices (red) and an explanation, made with CSS only (:checked + sibling selectors ~ and +);
 -Try again: is a reset button
-Live Coding: three coding tasks per lecture, each with requirements, an expected result, a box for your code and a **Show Solution** button (CSS-only, same :checked trick as the quiz)
-Contact form with required fields; Send message submits the form (action="thank-you.html" method="get") and opens a confirmation page
-Google Font (Sora), lazy loading for images below the fold

## Endterm features (JavaScript and jQuery, all code in `js/script.js`)
-**Form validation** (register.html, contact.html): required fields, email check with a RegEx, name check with a RegEx, password strength bar (weak / medium / strong), password confirmation, real-time feedback with Bootstrap is-valid / is-invalid classes, icons and messages; submit is blocked and an alert lists the errors when something is wrong
-**Dynamic search and filter** (topics.html): real-time, case-insensitive search with .on('input keyup'), category buttons (All, HTML, CSS, Flexbox & Grid, Bootstrap, JavaScript, jQuery) that work together with the search bar, result counter, "nothing found" message, fade effects
-**Dynamic table with CRUD** (students.html): Create (Bootstrap modal form), Read (table is drawn with jQuery), Update (the same modal with the data of the row), Delete (confirmation modal); data is kept in localStorage; total and average score
-**Image gallery** (gallery.html): Bootstrap grid, lightbox with previous / next arrows (also keyboard arrows and Esc), .fadeIn(), .fadeOut() and .animate() transitions, category filter
-**Final Test** (final-test.html): 27 questions (3 per lecture, theory and code); **Check Answers** shows the correct answers and a score in percent computed with jQuery (pass mark 70%), **Try again** resets the test
-**Lectures 5-9** with their own quizzes and live coding tasks; the Topics page has new JavaScript and jQuery categories for them
-All midterm pages, the responsive layout and the CSS-only quizzes stay unchanged

## Technologies used
HTML5, CSS3, Bootstrap 5.3 (grid, components, modals), JavaScript (ES6), jQuery 3.7.1, Regular Expressions, localStorage, Google Fonts, GitHub Pages

## Individual contributions
- **Aidana Muratova:**
  -Lectures 1, 2, 3: lecture text, quizzes (quiz-week1.html - quiz-week3.html) and live coding tasks (live-coding-week1.html - live-coding-week3.html)
  -Form validation (register.html, contact.html, thank-you.html): required fields, email RegEx, password strength indicator, password confirmation, real-time feedback, blocking the submit
- **Zhasmira Mamyrbayeva:**
  -Lectures 4, 5, 6: lecture text, quizzes (quiz-week4.html - quiz-week6.html) and live coding tasks (live-coding-week4.html - live-coding-week6.html)
  -Dynamic search and category filter (topics.html)
  -Image gallery with lightbox, arrows and fade / animate effects (gallery.html, img/gallery/)
- **Khanzada Nyshanbek:**
  -Lectures 7, 8, 9: lecture text, quizzes (quiz-week7.html - quiz-week9.html) and live coding tasks (live-coding-week7.html - live-coding-week9.html)
  -Dynamic table with CRUD operations and modals (students.html)
  -Final Test (final-test.html) with the score counter
  -Shared files: index.html, quiz.html, live-coding.html, css/style.css, js/script.js structure, README and publishing the website
