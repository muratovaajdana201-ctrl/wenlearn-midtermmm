# WebLearn: Online Courses Website


Website: https://muratovaajdana201-ctrl.github.io/weblearn-midterm/

## Project title and topic

WebLearn is a small website for learning web development. Our topic is the Web Technologies-1 course itself: a student reads a lecture, takes a quiz about it, and then tries to write code in three short tasks.

## Group members

- Aidana Muratova
- Zhasmira Mamyrbayeva
- Khanzada Nyshanbek

## Short description

We took the first four weeks of the course and put them on the site:

- Week 1: HTML Basics
- Week 2: CSS Basics
- Week 3: Flexbox and Grid
- Week 4: Bootstrap and Media Queries

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

- index.html: home page
- lectures.html: the four lectures and the schedule table
- quiz.html: page where you choose a quiz
- quiz-week1.html, quiz-week2.html, quiz-week3.html, quiz-week4.html: the quizzes
- live-coding.html: page where you choose coding tasks
- live-coding-week1.html, live-coding-week2.html, live-coding-week3.html, live-coding-week4.html: the coding tasks
- contact.html: contact form
- thank-you.html: page you see after sending the form
- css/style.css: our only CSS file
- img/aitu-logo.png: university logo
- screenshots/: pictures for this README
- README.md: this file

## What we did in this project

- We made 14 pages with HTML5 and CSS3, and all of them have the same header and footer.
- The header has the logo and a menu made with Flexbox. The page you are on is underlined, and the header stays at the top when you scroll (position: sticky).
- On small screens the menu turns into a hamburger button. We did it with a hidden checkbox and CSS, without JavaScript.
- We wrote the text of all four lectures on one page, with code examples, a few tables and a schedule table.
- We made one quiz for each lecture. Some questions are about theory and some are about code. Every question has three answers and a short explanation.
- The "Check Answers" button also works without JavaScript. There is a hidden checkbox at the top of the form. When it is checked, CSS selectors (~ and +) make the right answer green, the wrong one red and show the explanation. "Try again" is a simple *reset* button.
- We made three coding tasks for each lecture. Each task has requirements, an expected result, a place to write your code and a "Show Solution" button. This button works the same way as the quiz.
- We added the "Take the quiz" and "Live coding" buttons at the end of each lecture.
- We made a contact form with required fields. After sending it you get to *thank-you.html* .
- We wrote *css/style.css* ourselves. It has CSS variables, Flexbox, Grid, positioning, *:hover*, *:focus*, *:focus-visible* and *:nth-child()*.
- We added Bootstrap 5.3.3 for the grid, buttons and some utility classes.
- For different screen sizes we used the Bootstrap grid and our own media queries (992px, 768px and 576px).
- We used the Google font Sora, wrote *alt* text for images and added *loading="lazy"* to the images below the top of the page.
- At the end we put the project on GitHub Pages.

## Features implemented

- Header and footer on every page
- Hamburger menu on small screens
- Tables, lists, links, images and forms
- External CSS with variables, Flexbox, Grid and positioning
- Responsive design
- Quizzes with answer checking and explanations
- Coding tasks with solutions
- Contact form and confirmation page

## Technologies used

- HTML5
- CSS3
- Bootstrap 5.3.3 (from a CDN)
- Google Fonts (Sora)
- GitHub Pages

## How to run

Download the project and open *index.html* in a browser. You don't need to install anything. Bootstrap and the font come from the internet, so without a connection the site will look different.

## Individual contributions

- Aidana Muratova: Lectures page (lecture text and schedule table), Contact page, media queries, hamburger menu
- Zhasmira Mamyrbayeva: Quiz and Live Coding pages, forms, Bootstrap classes
- Khanzada Nyshanbek: project structure, Home page, header and footer, main part of `css/style.css` (variables, Flexbox, Grid), publishing the site

## Limitations

- There is no JavaScript on the site, so the quiz only shows which answers are right. It does not count points or save anything.
- The contact form does not send a real email. The email and social links in the footer are placeholders.
