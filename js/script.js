var savedTheme = null;
try { savedTheme = localStorage.getItem('weblearn-theme'); } catch (err) { }
document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : 'light');
document.documentElement.setAttribute('data-bs-theme', savedTheme === 'dark' ? 'dark' : 'light');
$(document).ready(function () {
    var EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
    var NAME_RE = /^[A-Za-zА-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі' -]{2,}$/;
    var rules = {
        name: function (v) {
            if (v.trim() === '') return 'Name is required.';
            if (!NAME_RE.test(v.trim())) return 'Use letters only, at least 2 characters.';
            return '';
        },
        email: function (v) {
            if (v.trim() === '') return 'Email is required.';
            if (!EMAIL_RE.test(v.trim())) return 'Enter a valid email, e.g. name@mail.com.';
            return '';
        },
        password: function (v) {
            if (v === '') return 'Password is required.';
            if (v.length < 8) return 'Password must have at least 8 characters.';
            if (getStrength(v).level === 'weak') return 'Password is too weak. Add digits, capital letters or symbols.';
            return '';
        },
        confirm: function (v, $form) {
            if (v === '') return 'Please repeat the password.';
            if (v !== $form.find('[data-rule="password"]').val()) return 'Passwords do not match.';
            return '';
        },
        message: function (v) {
            if (v.trim() === '') return 'Message is required.';
            if (v.trim().length < 10) return 'Message must have at least 10 characters.';
            return '';
        },
        loginpw: function (v) {
            if (v === '') return 'Password is required.';
            if (v.length < 6) return 'Password must have at least 6 characters.';
            return '';
        },
        terms: function (v, $form, $input) {
            return $input.is(':checked') ? '' : 'You must accept the terms.';
        }
    };
    function getStrength(pw) {
        var score = 0;
        if (pw.length >= 8) score++;
        if (pw.length >= 12) score++;
        if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
        if (/\d/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (pw.length === 0) return { level: 'none', percent: 0, text: '' };
        if (score <= 2) return { level: 'weak', percent: 33, text: 'Weak' };
        if (score === 3) return { level: 'medium', percent: 66, text: 'Medium' };
        return { level: 'strong', percent: 100, text: 'Strong' };
    }
    
    function showState($input, message) {
    var $group = $input.closest('.field');
    var $feedback = $group.find('.field-msg');

    $input.removeClass('is-valid is-invalid');

    if (message === '') {
        $input.addClass('is-valid');
        $feedback.removeClass('text-danger')
            .addClass('text-success')
            .text('Looks good!');
    } else {
        $input.addClass('is-invalid');
        $feedback.removeClass('text-success')
            .addClass('text-danger')
            .text(message);
    }
}
    function validateInput($input) {
        var rule = rules[$input.data('rule')];
        if (!rule) return true;
        var message = rule($input.val(), $input.closest('form'), $input);
        showState($input, message);
        return message === '';
    }
    function updateStrength($input) {
        var s = getStrength($input.val());
        var $bar = $('#strengthBar');
        $bar.removeClass('bg-danger bg-warning bg-success');
        if (s.level === 'weak') $bar.addClass('bg-danger');
        if (s.level === 'medium') $bar.addClass('bg-warning');
        if (s.level === 'strong') $bar.addClass('bg-success');
        $bar.css('width', s.percent + '%');
        $('#strengthText').text(s.text ? 'Password strength: ' + s.text : '');
    }
    $('form.js-validate').each(function () {
        var $form = $(this);
        var $fields = $form.find('[data-rule]');
        $fields.on('input blur change', function () {
            var $input = $(this);
            validateInput($input);
            if ($input.data('rule') === 'password') {
                updateStrength($input);
                var $confirm = $form.find('[data-rule="confirm"]');
                if ($confirm.val() !== '') validateInput($confirm);
            }
        });
        $form.find('.toggle-pw').on('click', function () {
            var $target = $($(this).data('target'));
            var show = $target.attr('type') === 'password';
            $target.attr('type', show ? 'text' : 'password');
            $(this).text(show ? 'Hide' : 'Show');
        });
        $form.on('submit', function (e) {
            var allValid = true;
            var errors = [];
            $fields.each(function () {
                if (!validateInput($(this))) {
                    allValid = false;
                    errors.push($(this).closest('.field').find('label').first().text().replace('*', '').trim());
                }
            });
            var $alert = $form.find('.form-alert');
            if (!allValid) {
                e.preventDefault();
                $alert.removeClass('alert-success').addClass('alert-danger')
                    .html('<strong>Please fix the errors:</strong> ' + errors.join(', ') + '.').hide().fadeIn(300);
                $form.find('.is-invalid').first().trigger('focus');
                return;
            }
            if ($form.data('success') === 'signin') {
                e.preventDefault();
                try {
                    localStorage.setItem(USER_KEY, JSON.stringify({ name: $form.find('[data-rule="name"]').val().trim(), email: $form.find('[data-rule="email"]').val().trim() }));
                } catch (err) { }
                $form[0].reset();
                $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
               
                $form.find('.field-msg').text('');
                $alert.hide();
                renderAuth();
                return;
            }
            if ($form.data('success') === 'inline') {
                e.preventDefault();
                $alert.removeClass('alert-danger').addClass('alert-success')
                    .html('<strong>Registration successful!</strong> Welcome to WebLearn, ' +
                        $('<div>').text($form.find('[data-rule="name"]').val().trim()).html() + '.').hide().fadeIn(300);
                $form[0].reset();
                $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                
                $form.find('.field-msg').text('');
                updateStrength($form.find('[data-rule="password"]'));
            }
        });
    });
    if ($('#topicGrid').length) {
        var activeCategory = 'all';
        function filterTopics() {
            var query = $('#searchInput').val().toLowerCase().trim();
            var visible = 0;
            $('.topic-item').each(function () {
                var $item = $(this);
                var text = ($item.find('h3').text() + ' ' + $item.find('p').text() + ' ' + $item.data('tags')).toLowerCase();
                var matchSearch = text.indexOf(query) !== -1;
                var categories = String($item.attr('data-category') || '').split(/\s+/);
var matchCategory = activeCategory === 'all' || categories.indexOf(activeCategory) !== -1;
                if (matchSearch && matchCategory) {
                    visible++;
                    if (!$item.is(':visible')) $item.stop(true, true).fadeIn(200);
                } else if ($item.is(':visible')) {
                    $item.stop(true, true).fadeOut(150);
                }
            });
            $('#resultCount').text(visible + (visible === 1 ? ' topic found' : ' topics found'));
            $('#noResults').toggle(visible === 0);
        }
        $('#searchInput').on('input keyup', filterTopics);
        $('.filter-btn').on('click', function () {
            $('.filter-btn').removeClass('active').attr('aria-pressed', 'false');
            $(this).addClass('active').attr('aria-pressed', 'true');
            activeCategory = $(this).data('filter');
            filterTopics();
        });
        $('#clearSearch').on('click', function () {
            $('#searchInput').val('').trigger('input').trigger('focus');
        });
        filterTopics();
    }
    if ($('#studentsTable').length) {
        var STORAGE_KEY = 'weblearn-students';
        var defaults = [
            { id: 1, name: 'Aidana Muratova', email: 'aidana@astanait.edu.kz', lecture: 'Week 4', score: 92 },
            { id: 2, name: 'Zhasmira Mamyrbayeva', email: 'zhasmira@astanait.edu.kz', lecture: 'Week 3', score: 85 },
            { id: 3, name: 'Khanzada Nyshanbek', email: 'khanzada@astanait.edu.kz', lecture: 'Week 4', score: 78 },
            { id: 4, name: 'Dias Serikov', email: 'dias.serikov@astanait.edu.kz', lecture: 'Week 2', score: 64 },
            { id: 5, name: 'Madina Aliyeva', email: 'madina.a@astanait.edu.kz', lecture: 'Week 1', score: 95 }
        ];
        var students = [];
        var deleteId = null;
        function loadStudents() {
            try {
                var saved = localStorage.getItem(STORAGE_KEY);
                students = saved ? JSON.parse(saved) : defaults.slice();
            } catch (err) {
                students = defaults.slice();
            }
        }
        function saveStudents() {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); } catch (err) { }
        }
        function renderTable() {
            var $body = $('#studentsBody').empty();
            $.each(students, function (i, s) {
                var $row = $('<tr>').attr('data-id', s.id);
                $('<td>').text(i + 1).appendTo($row);
                $('<td>').text(s.name).appendTo($row);
                $('<td>').text(s.email).appendTo($row);
                $('<td>').text(s.lecture).appendTo($row);
                $('<td>').append($('<span class="score-pill">').text(s.score).addClass(s.score >= 90 ? 'high' : s.score >= 70 ? 'mid' : 'low')).appendTo($row);
                $('<td class="text-end text-nowrap">')
                    .append($('<button type="button" class="btn btn-sm btn-outline-primary me-1 edit-btn">Edit</button>'))
                    .append($('<button type="button" class="btn btn-sm btn-outline-danger delete-btn">Delete</button>'))
                    .appendTo($row);
                $body.append($row);
            });
            $('#emptyRow').toggle(students.length === 0);
            var avg = students.length
                ? Math.round(students.reduce(function (sum, s) { return sum + s.score; }, 0) / students.length) : 0;
            $('#statTotal').text(students.length);
            $('#statAvg').text(avg);
        }
        var studentModal = null;
        var deleteModal = null;
        if (window.bootstrap) {
            studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
            deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        }
        function checkStudentForm() {
            var ok = true;
            var name = $('#stName').val().trim();
            var email = $('#stEmail').val().trim();
            var score = $('#stScore').val();
            function mark($el, bad, msg) {
                $el.toggleClass('is-invalid', bad).toggleClass('is-valid', !bad);
                $el.siblings('.invalid-feedback').text(msg);
                if (bad) ok = false;
            }
            mark($('#stName'), !NAME_RE.test(name), 'Enter a name (letters only, min 2 characters).');
            mark($('#stEmail'), !EMAIL_RE.test(email), 'Enter a valid email address.');
            mark($('#stScore'), score === '' || isNaN(score) || score < 0 || score > 100, 'Score must be a number from 0 to 100.');
            return ok;
        }
        $('#addStudentBtn').on('click', function () {
            $('#studentModalTitle').text('Add student');
            $('#studentForm')[0].reset();
            $('#stId').val('');
            $('#studentForm .form-control, #studentForm .form-select').removeClass('is-valid is-invalid');
            studentModal.show();
        });
        $('#studentsBody').on('click', '.edit-btn', function () {
            var id = Number($(this).closest('tr').data('id'));
            var s = students.filter(function (x) { return x.id === id; })[0];
            $('#studentModalTitle').text('Edit student');
            $('#stId').val(s.id);
            $('#stName').val(s.name);
            $('#stEmail').val(s.email);
            $('#stLecture').val(s.lecture);
            $('#stScore').val(s.score);
            $('#studentForm .form-control, #studentForm .form-select').removeClass('is-valid is-invalid');
            studentModal.show();
        });
        $('#studentForm .form-control').on('input', checkStudentForm);
        $('#studentForm').on('submit', function (e) {
            e.preventDefault();
            if (!checkStudentForm()) return;
            var data = {
                name: $('#stName').val().trim(),
                email: $('#stEmail').val().trim(),
                lecture: $('#stLecture').val(),
                score: Number($('#stScore').val())
            };
            var id = $('#stId').val();
            var newId;
            if (id === '') {
                newId = students.reduce(function (m, s) { return Math.max(m, s.id); }, 0) + 1;
                students.push($.extend({ id: newId }, data));
            } else {
                newId = Number(id);
                $.each(students, function (i, s) { if (s.id === newId) $.extend(s, data); });
            }
            saveStudents();
            renderTable();
            studentModal.hide();
            showTableAlert(id === '' ? 'Student added.' : 'Student updated.', 'success');
        });
        $('#studentsBody').on('click', '.delete-btn', function () {
            var $tr = $(this).closest('tr');
            deleteId = Number($tr.data('id'));
            $('#deleteName').text($tr.children().eq(1).text());
            deleteModal.show();
        });
        $('#confirmDelete').on('click', function () {
            var $tr = $('#studentsBody tr[data-id="' + deleteId + '"]');
            deleteModal.hide();
            $tr.fadeOut(300, function () {
                students = students.filter(function (s) { return s.id !== deleteId; });
                saveStudents();
                renderTable();
                showTableAlert('Student deleted.', 'danger');
            });
        });
        $('#resetData').on('click', function () {
            students = defaults.slice();
            saveStudents();
            renderTable();
            showTableAlert('Demo data restored.', 'info');
        });
        function showTableAlert(text, type) {
            $('#tableAlert').removeClass('alert-success alert-danger alert-info').addClass('alert-' + type)
                .text(text).stop(true, true).fadeIn(200).delay(2000).fadeOut(400);
        }
        loadStudents();
        renderTable();
    }
    if ($('#developersGrid').length) {
    var $developers = $('#developersGrid .developer-col');
    $('.developer-filter').on('click', function () {
        var category = $(this).attr('data-filter');
        $('.developer-filter').removeClass('active');
        $(this).addClass('active');
        $developers.each(function () {
            var $card = $(this);
            var match = category === 'all' ||
                $card.attr('data-category') === category;
            $card.stop(true, true);
            if (match) {
                if (!$card.is(':visible')) {
                    $card.fadeIn(350);
                }
            } else {
                if ($card.is(':visible')) {
                    $card.fadeOut(350);
                }
            }
        });
    });
}
    if ($('#galleryGrid').length) {
        var $photos = $('#galleryGrid .gallery-item');
        var $visiblePhotos = $photos;
        var current = 0;
        function showPhoto(index) {
            if (!$visiblePhotos.length) return;
            current = (index + $visiblePhotos.length) % $visiblePhotos.length;
            var $item = $visiblePhotos.eq(current);
            var $img = $item.find('img');
            $('#galleryImage')
                .attr('src', $img.attr('src'))
                .attr('alt', $img.attr('alt'));
            $('#galleryCaption').text($item.find('.gallery-cap').text());
            $('#galleryCounter').text(
                (current + 1) + ' / ' + $visiblePhotos.length
            );
        }
        $photos.on('click', function () {
            $visiblePhotos = $photos.filter(':visible');
            current = $visiblePhotos.index(this);
            if (current < 0) return;
            showPhoto(current);
            $('#galleryLightbox')
                .css('display', 'flex')
                .hide()
                .fadeIn(200);
            $('#galleryImage')
                .css({ opacity: 0, marginTop: '30px' })
                .animate({ opacity: 1, marginTop: '0px' }, 400);
        });
        function changePhoto(direction) {
            $('#galleryImage').stop(true, true).fadeOut(150, function () {
                showPhoto(current + direction);
                $(this).fadeIn(150);
            });
        }
        $('#galleryNext').on('click', function () {
            changePhoto(1);
        });
        $('#galleryPrev').on('click', function () {
            changePhoto(-1);
        });
        function closeGallery() {
            $('#galleryLightbox').fadeOut(200);
        }
        $('#galleryClose').on('click', closeGallery);
        $('#galleryLightbox').on('click', function (e) {
            if (e.target === this) closeGallery();
        });
        $('.gallery-filter').on('click', function () {
            var category = $(this).attr('data-filter');
            $('.gallery-filter').removeClass('active');
            $(this).addClass('active');
            $photos.each(function () {
                var $item = $(this);
                var match = category === 'all' ||
                    $item.attr('data-category') === category;
                $item.stop(true, true);
                if (match) {
                    if (!$item.is(':visible')) {
                        $item.fadeIn(350).css('display', 'flex');
                    }
                } else {
                    if ($item.is(':visible')) {
                        $item.fadeOut(350);
                    }
                }
            });
        });
        $(document).on('keydown', function (e) {
            if (!$('#galleryLightbox').is(':visible')) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') changePhoto(1);
            if (e.key === 'ArrowLeft') changePhoto(-1);
        });
    }
    $('.quiz:not([data-final])').each(function () {
        var $quiz = $(this);
        var answersVisible = false;
        $quiz.find('.check-btn').on('click', function () {
            answersVisible = !answersVisible;
            if (answersVisible) {
                $quiz.find('.question').each(function () {
                    var $question = $(this);
                    var $correct = $question.find('.option.correct');
                    var $selected = $question.find('.opt-input:checked + .option');
                    $question.find('.option').removeClass('correct-answer wrong-answer');
                    $correct.addClass('correct-answer');
                    if ($selected.length && !$selected.hasClass('correct')) {
                        $selected.addClass('wrong-answer');
                    }
                    $question.find('.explain').addClass('show');
                });
                $quiz.find('.show-text').hide();
                $quiz.find('.hide-text').show();
                $quiz.find('.legend-note').show();
            } else {
                $quiz.find('.option').removeClass('correct-answer wrong-answer');
                $quiz.find('.explain').removeClass('show');
                $quiz.find('.show-text').show();
                $quiz.find('.hide-text').hide();
                $quiz.find('.legend-note').hide();
            }
        });
        $quiz.on('reset', function () {
            answersVisible = false;
            $quiz.find('.option').removeClass('correct-answer wrong-answer');
            $quiz.find('.explain').removeClass('show');
            $quiz.find('.show-text').show();
            $quiz.find('.hide-text').hide();
            $quiz.find('.legend-note').hide();
        });
    });
    if ($('.quiz[data-final]').length) {
        var $quiz = $('.quiz[data-final]');
        var $score = $('#finalScore');
        function showScore() {
            var total = $quiz.find('.question').length;
            var right = 0;
            $quiz.find('.question').each(function () {
                var $chosen = $(this).find('.opt-input:checked + .option');
                if ($chosen.length && $chosen.hasClass('correct')) right++;
            });
            var percent = Math.round(right / total * 100);
            var passed = percent >= 70;
            var message = 'Your score: ' + right + ' / ' + total + ' (' + percent + '%). ';
            message += passed ? 'Well done, you passed!' : 'Review the lectures and try again.';
            $score.text(message);
            $score.toggleClass('pass', passed).toggleClass('fail', !passed).addClass('show');
        }
        $('#check-final').on('change', function () {
            if (this.checked) { showScore(); $('html, body').animate({ scrollTop: $score.offset().top - 120 }, 400); }
            else { $score.removeClass('show pass fail'); }
        });
        $quiz.on('reset', function () {
            $score.removeClass('show pass fail').text('');
        });
    }
    var THEME_KEY = 'weblearn-theme';
    function applyTheme(theme) {
        $('html').attr('data-theme', theme).attr('data-bs-theme', theme);
        $('#themeToggle').text(theme === 'dark' ? 'Light' : 'Dark').attr('aria-pressed', String(theme === 'dark'));
    }
    $('<li class="nav-extra"><button type="button" id="themeToggle" class="theme-btn" aria-label="Switch between light and dark theme"></button></li>').appendTo('.nav-list');
    applyTheme($('html').attr('data-theme') === 'dark' ? 'dark' : 'light');
    $('#themeToggle').on('click', function () {
        var next = $('html').attr('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (err) { }
    });
    var USER_KEY = 'weblearn-user';
    function getUser() {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY));
        } catch (err) {
            return null;
        }
    }
    function renderAuth() {
        var user = getUser();
        var $item = $('<li id="authItem" class="nav-extra">');
        $('#authItem').remove();
        if (user) {
            $('<span class="auth-name">').text('Hello, ' + user.name).appendTo($item);
            $('<button type="button" class="theme-btn sign-out-btn">Sign out</button>').appendTo($item);
        } else {
            $('<a href="register.html" class="auth-link">Register</a>').toggleClass('active', /register\.html$/.test(location.pathname)).appendTo($item);
            $('<a href="signin.html" class="auth-link">Sign in</a>').toggleClass('active', /signin\.html$/.test(location.pathname)).appendTo($item);
        }
        $item.appendTo('.nav-list');
        $('[data-auth="in"]').toggle(!!user);
        $('[data-auth="out"]').toggle(!user);
        $('.auth-welcome-name').text(user ? user.name : '');
    }
    $(document).on('click', '.sign-out-btn', function () {
        try { localStorage.removeItem(USER_KEY); } catch (err) { }
        renderAuth();
    });
    renderAuth();
    if ($('.faq-item').length) {
        $('.faq-answer').hide();
        $('.faq-question').on('click', function () {
            var $question = $(this);
            var isOpen = $question.attr('aria-expanded') === 'true';
            $question.next('.faq-answer').stop(true, true).slideToggle(300);
            $question.attr('aria-expanded', String(!isOpen));
            $question.find('.faq-icon').text(isOpen ? '+' : '\u2212');
            $question.closest('.faq-item').toggleClass('open', !isOpen);
        });
    }
    if ($('#bookGrid').length) {
        var books = [];
        var totalBooks = 0;
        function showBookStatus(text, type) {
            var $status = $('#bookStatus');
            if (text === '') {
                $status.hide();
                return;
            }
            $status.removeClass('alert-info alert-danger alert-success alert-warning').addClass('alert alert-' + type).text(text).show();
        }
        function renderBooks() {
            var list = books.slice();
            var sort = $('#bookSort').val();
            if ($('#bookCover').is(':checked')) list = list.filter(function (b) { return b.cover_i; });
            if (sort === 'newest') list.sort(function (a, b) { return (b.first_publish_year || 0) - (a.first_publish_year || 0); });
            if (sort === 'oldest') list.sort(function (a, b) { return (a.first_publish_year || 9999) - (b.first_publish_year || 9999); });
            if (sort === 'editions') list.sort(function (a, b) { return (b.edition_count || 0) - (a.edition_count || 0); });
            var $grid = $('#bookGrid').empty();
            if (list.length === 0) {
                showBookStatus(books.length ? 'No books with a cover here. Uncheck the box to see all books.' : 'No books found. Try another word.', 'warning');
                return;
            }
            showBookStatus('Showing ' + list.length + ' of ' + totalBooks + ' books found.', 'success');
            $.each(list, function (i, b) {
                var $col = $('<div class="col-12 col-md-6 col-lg-3">').appendTo($grid);
                var $card = $('<div class="lecture-card book-card">').appendTo($col);
                if (b.cover_i) {
                    $('<img class="book-cover" loading="lazy">').attr('src', 'https://covers.openlibrary.org/b/id/' + b.cover_i + '-M.jpg').attr('alt', 'Cover of ' + b.title).appendTo($card);
                } else {
                    $('<div class="book-nocover">No cover</div>').appendTo($card);
                }
                $('<h3>').text(b.title).appendTo($card);
                $('<p class="small">').text(Array.isArray(b.author_name) ? 'by ' + b.author_name.slice(0, 2).join(', ') : 'Unknown author').appendTo($card);
                $('<p class="small text-muted">').text((b.first_publish_year ? 'First published: ' + b.first_publish_year : 'Year unknown') + ', ' + (b.edition_count || 0) + ' editions').appendTo($card);
                $('<a class="btn btn-accent" target="_blank" rel="noopener">View on Open Library</a>').attr('href', 'https://openlibrary.org' + b.key).appendTo($card);
            });
        }
        function loadBooks() {
            var query = $('#bookQuery').val().trim();
            if (query === '') {
                books = [];
                $('#bookGrid').empty();
                showBookStatus('Type a word to search, for example javascript.', 'warning');
                return;
            }
            $('#bookGrid').empty();
            showBookStatus('Searching books...', 'info');
            $('#bookSearchBtn').prop('disabled', true);
            fetch('https://openlibrary.org/search.json?limit=24&fields=key,title,author_name,first_publish_year,cover_i,edition_count&' + $('#bookField').val() + '=' + encodeURIComponent(query))
                .then(function (response) {
                    if (!response.ok) throw new Error('server answered with status ' + response.status);
                    return response.json();
                })
                .then(function (data) {
                    if (!data || !Array.isArray(data.docs)) throw new Error('unexpected data format');
                    books = data.docs;
                    totalBooks = data.numFound || books.length;
                    renderBooks();
                })
                .catch(function (error) {
                    books = [];
                    showBookStatus('Could not load the books (' + error.message + '). Check your internet connection and press Search again.', 'danger');
                })
                .finally(function () {
                    $('#bookSearchBtn').prop('disabled', false);
                });
        }
        $('#bookForm').on('submit', function (e) {
            e.preventDefault();
            loadBooks();
        });
        $('.book-chip').on('click', function () {
            $('#bookField').val('q');
            $('#bookQuery').val($(this).data('q'));
            loadBooks();
        });
        $('#bookSort').on('change', renderBooks);
        $('#bookCover').on('change', renderBooks);
        loadBooks();
    }
});
