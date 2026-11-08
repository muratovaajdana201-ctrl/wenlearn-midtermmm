
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

    function addIcon($input, kind, symbol) {
        var $icon = $('<span class="field-icon ' + kind + '" aria-hidden="true">' + symbol + '</span>').insertAfter($input);
        $icon.css('top', $input.position().top + $input.outerHeight() / 2);
    }

    function showState($input, message) {
        var $group = $input.closest('.field');
        var $feedback = $group.find('.field-msg');
        $input.removeClass('is-valid is-invalid');
        $group.find('.field-icon').remove();
        if (message === '') {
            $input.addClass('is-valid');
            $feedback.removeClass('text-danger').addClass('text-success').text('Looks good!');
            if ($input.attr('type') !== 'checkbox') addIcon($input, 'ok', '&#10003;');
        } else {
            $input.addClass('is-invalid');
            $feedback.removeClass('text-success').addClass('text-danger').text(message);
            if ($input.attr('type') !== 'checkbox') addIcon($input, 'bad', '&#10007;');
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
            if ($form.data('success') === 'inline') {
                e.preventDefault();
                $alert.removeClass('alert-danger').addClass('alert-success')
                    .html('<strong>Registration successful!</strong> Welcome to WebLearn, ' +
                        $('<div>').text($form.find('[data-rule="name"]').val().trim()).html() + '.').hide().fadeIn(300);
                $form[0].reset();
                $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $form.find('.field-icon').remove();
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
                var matchCategory = activeCategory === 'all' || $item.data('category') === activeCategory;
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
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(students)); } catch (err) {  }
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
            $('#studentsBody tr[data-id="' + newId + '"]').addClass('row-flash');
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

    
   

    if ($('#galleryGrid').length) {
        var $photos = $('#galleryGrid .gallery-item');
        var $visiblePhotos = $photos;
        var current = 0;

        function showPhoto(index) {
            if ($visiblePhotos.length === 0) return;

            current = (index + $visiblePhotos.length) %
                $visiblePhotos.length;

            var $item = $visiblePhotos.eq(current);

            $('#galleryImage')
                .attr('src', $item.find('img').attr('src'))
                .attr('alt', $item.find('img').attr('alt'));

            $('#galleryCaption').text(
                $item.find('.gallery-cap').text()
            );

            $('#galleryCounter').text(
                (current + 1) + ' / ' + $visiblePhotos.length
            );
        }

    
        $photos.on('click', function () {
            $visiblePhotos = $photos.filter(':visible');
            current = $visiblePhotos.index(this);

            if (current === -1) return;

            showPhoto(current);
            
$('#galleryImage')
    .css({ opacity: 0, marginTop: '30px' })
    .animate({ opacity: 1, marginTop: '0px' }, 400);


            $('#galleryLightbox')
                .css('display', 'flex')
                .hide()
                .fadeIn(200);
        });

       
        $('#galleryNext').on('click', function () {
            $('#galleryImage').fadeOut(150, function () {
                showPhoto(current + 1);
                $(this).fadeIn(150);
            });
        });

        $('#galleryPrev').on('click', function () {
            $('#galleryImage').fadeOut(150, function () {
                showPhoto(current - 1);
                $(this).fadeIn(150);
            });
        });

        
        function closeGallery() {
            $('#galleryLightbox').fadeOut(200);
        }

        $('#galleryClose').on('click', closeGallery);

        $('#galleryLightbox').on('click', function (event) {
            if (event.target === this) {
                closeGallery();
            }
        });

        $('.gallery-filter').on('click', function () {
            $('.gallery-filter').removeClass('active');
            $(this).addClass('active');

            var category = $(this).data('filter');

            $photos.each(function () {
                var $item = $(this);

                if (category === 'all' ||
                    $item.data('category') === category) {
                    $item.fadeIn(200);
                } else {
                    $item.fadeOut(200);
                }
            });
        });

        
        $(document).on('keydown', function (event) {
            if (!$('#galleryLightbox').is(':visible')) return;

            if (event.key === 'Escape') closeGallery();
            if (event.key === 'ArrowRight') {
                showPhoto(current + 1);
            }
            if (event.key === 'ArrowLeft') {
                showPhoto(current - 1);
            }
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
});
