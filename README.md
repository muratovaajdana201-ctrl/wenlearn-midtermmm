# WebLearn: Online Courses Website


Website: https://muratovaajdana201-ctrl.github.io/weblearn-midterm/

## Project title and topic

WebLearn is a small website for learning web development. Our topic is the Web Technologies-1 course itself: a student reads a lecture, takes a quiz about it, and then tries to write code in three short tasks.

## Group members

-Aidana Muratova
-Zhasmira Mamyrbayeva
-Khanzada Nyshanbek

## Short description

We took the first four weeks of the course and put them on the site:

-Week 1: HTML Basics
-Week 2: CSS Basics
-Week 3: Flexbox and Grid
-Week 4: Bootstrap and Media Queries

Every week goes the same way. You read the lecture, then press "Take the quiz", then "Live coding". These two buttons are at the end of each lecture, so you don't have to look for the right page. The site has 14 pages, 44 quiz questions and 12 coding tasks.

## Screenshots

Home page:

![Home page](screenshotsm/home.png)

Lectures page with the schedule table:

![Lectures page](screenshotsm/lectures.png)

Quiz page, where you choose a week:

![Quiz page](screenshotsm/quiz.png)

Quiz for week 1:

![Quiz for week 1](screenshotsm/quiz(1).png)

Live coding page, where you choose a week:

![Live coding page](screenshotsm/live-coding.png)


Contact page:

![Contact page](screenshotsm/contact.png)

Home page on a narrower screen:

![Mobile screen](screenshotsm/mobile.png)

## Project structure

-index.html: home page
-lectures.html: the four lectures and the schedule table
-quiz.html: page where you choose a quiz
-quiz-week1.html, quiz-week2.html, quiz-week3.html, quiz-week4.html: the quizzes
-live-coding.html: page where you choose coding tasks
-live-coding-week1.html, live-coding-week2.html, live-coding-week3.html, live-coding-week4.html: the coding tasks
-contact.html: contact form
-thank-you.html: page you see after sending the form
-css/style.css: our only CSS file
-img/aitu-logo.png: university logo
-screenshots/: pictures for this README
-README.md: this file

## What we did in this project

-We made 14 pages with HTML5 and CSS3, and all of them have the same header and footer.
-The header has the logo and a menu made with Flexbox. The page you are on is underlined, and the header stays at the top when you scroll (position: sticky).
-On small screens the menu turns into a hamburger button. We did it with a hidden checkbox and CSS, without JavaScript.
-We wrote the text of all four lectures on one page, with code examples, a few tables and a schedule table.
-We made one quiz for each lecture. Some questions are about theory and some are about code. Every question has three answers and a short explanation.
-The "Check Answers" button also works without JavaScript. There is a hidden checkbox at the top of the form. When it is checked, CSS selectors (~ and +) make the right answer green, the wrong one red and show the explanation. "Try again" is a simple reset button.
-We made three coding tasks for each lecture. Each task has requirements, an expected result, a place to write your code and a "Show Solution" button. This button works the same way as the quiz.
-We added the "Take the quiz" and "Live coding" buttons at the end of each lecture.
-We made a contact form with required fields. After sending it you get to thank-you.html .
-We wrote css/style.css ourselves. It has CSS variables, Flexbox, Grid, positioning, :hover, :focus, :focus-visible and :nth-child().
-We added Bootstrap 5.3.3 for the grid, buttons and some utility classes.
-For different screen sizes we used the Bootstrap grid and our own media queries (992px, 768px and 576px).
-We used the Google font Sora, wrote alt text for images and added loading="lazy" to the images below the top of the page.
-At the end we put the project on GitHub Pages.

## Features implemented

-Header and footer on every page
-Hamburger menu on small screens
-Tables, lists, links, images and forms
-External CSS with variables, Flexbox, Grid and positioning
-Responsive design
-Quizzes with answer checking and explanations
-Coding tasks with solutions
-Contact form and confirmation page

## Technologies used

-HTML5
-CSS3
-Bootstrap 5.3.3 (from a CDN)
-Google Fonts (Sora)
-GitHub Pages

## How to run

Download the project and open index.html in a browser. You don't need to install anything. Bootstrap and the font come from the internet, so without a connection the site will look different.



## Limitations

- There is no JavaScript on the site, so the quiz only shows which answers are right. It does not count points or save anything.
- The contact form does not send a real email. The email and social links in the footer are placeholders.

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
