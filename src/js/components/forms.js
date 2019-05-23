/**
 * Модуль для работы placeholder в элементах формы (.field)
 * @module Input
 */


/**
 * Установить фокус
 * @private
 * @param {object} input
 */
function focusLabel(input){
    input.closest('.field').addClass("has-focus");
}

/**
 * Убрать фокус
 * @private
 * @param {object} input
 */
function blurLabel(input){
    var wrapper = input.closest('.field');
    wrapper.removeClass("has-focus");
}

/**
 * Проверить инпут на наличие value
 * @private
 * @param {object} input
 */
function checkInput(input){
    var wrapper = input.closest('.field');
    if (input.val().length > 0)
        wrapper.addClass("has-value");
    else
        wrapper.removeClass("has-value");
}

/**
 * инициализация событий для инпута
 * @example
 * Input.init();
 */
function init(){
    let inputs = $('.field__input[type="text"], .field__input[type="email"], .field__input[type="password"], .field__input[type="tel"]');
    let placeholders = $('.field__placeholder');
    let flow = $('.flow-textarea');
    
    placeholders.click(function(){
      $(this).closest('.field').find('.field__input').focus();
    });

    inputs.each(function(i, item) {
        checkInput($(item));
    });

    inputs.focus(function(){
        focusLabel($(this));
    });

    inputs.blur(function(){
        blurLabel($(this));
        checkInput($(this));
    });

    $('.btn-search').on('click', function(e){
        e.preventDefault();
        $('#search').focus();
    });

    flow.on('keydown', function(){
        $(this).change();
    });

    flow.on('change', function(){
        setTimeout(function(self){
            let flowEx = $(self).siblings('.flow-textarea-example');
            flowEx.html($(self).val().replace(/\r?\n/g,'<br/>'));
            if (flow.outerHeight() !== flowEx.outerHeight()) {
                flow.stop().animate({'height': flowEx.outerHeight()}, 300);
            }
        }, 10, this);
    });

    let radios = $('.field__input[type="radio"]');
    let checkboxes = $('.field__input[type="checkbox"]');

    radios.on('change', function() {
        $(this).closest('.field').addClass('is-checked');
        $(`[name="${$(this).attr('name')}"]:not(#${$(this).attr('id')})`).closest('.field').removeClass('is-checked');
    })
    checkboxes.on('change', function() {
        if ($(this).prop('checked')) {
            $(this).closest('.field').addClass('is-checked');
        } else {
            $(this).closest('.field').removeClass('is-checked');
        }
    });

    /*
    let form = $('.js-form'),
        selfSubmit = form.find('button');

    form.on('submit', function(e) {
        e.preventDefault();

        let request = $.ajax({
            url: form.attr('action'),
            type: 'POST',
            dataType: 'json',
            data: form.serialize(),
            beforeSend: function () {
                selfSubmit.attr('disabled', 'disabled');
                form.find('input').removeClass('error');
            }
        });
        request.done(function (response, textStatus, jqXHR) {
            if (response.result) {
                $('.js-form-wrap').addClass('hide');
                $('.js-form-success').addClass('show');
                form[0].reset();
                selfSubmit.attr('disabled', false);
            } else {
                selfSubmit.attr('disabled', false);
                $.each(response.errors, function (key, val) {
                    $('input[name="'+key+'"').addClass('error');
                });
            }
        });
        request.fail(function (jqXHR, textStatus) {
            console.log("Request failed: " + textStatus);
            selfSubmit.attr('disabled', false);
        });
    });
    */
}

module.exports = {init};