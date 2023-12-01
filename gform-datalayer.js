/**
* Author: Md Hasanuzzamna
* Email: webhasan24@gmail.com
* Linkedin: https://linkedin.com/md-h
* Last Update: 01 Dec 2023
*/

(function($) {
    $(document).ready(function(){
        var forms = document.querySelectorAll('form[id^="gform_"]');
        forms.forEach(function(form) {
            var formId = form.getAttribute('data-formid');
            var isAjaxForm = form.getAttribute('target') === ('gform_ajax_frame_' + formId);

            form.addEventListener('submit', function(event) {

                var formData = new FormData(this);
                var gformData = {formId: formId};

                if(isAjaxForm) {
                    formData.forEach(function (value, key) {
                        if(key) {
                            var formatedKey = formId + '_' + key.replace('.', '_');
                            gformData[formatedKey] = value;
                        }
                    });
                    localStorage.removeItem('gFormData');
                    localStorage.setItem('gFormData', JSON.stringify(gformData));
                }else {
                     var errorRquired = false;

                     formData.forEach(function (value, key) {
                        if(key) {
                            var inputField = form.querySelector('[name="'+key+'"]');

                            if(inputField) {
                                var isRquiredField = inputField.getAttribute('aria-required') === 'true';

                                if(isRquiredField) {
                                    console.log(inputField);

                                    if(inputField.tagName === 'SELECT') {
                                        var selectedOptionVal = inputField.options[inputField.selectedIndex].text;
                                        if(!selectedOptionVal) {
                                            console.log('not work here', inputField);
                                            errorRquired = true;
                                        }
                                    }else if((inputField.getAttribute('type') === 'radio') || (inputField.getAttribute('type') === 'checkbox')) {
                                        var selectedRadioField = form.querySelector('[name="'+key+'"]:checked');
                                        if(!selectedRadioField) {
                                            console.log('not work here', inputField);
                                            errorRquired = true;
                                        }
                                    }else if((inputField.getAttribute('type') === 'email') && (!value || !value.includes('@'))) {
                                         console.log('not work here', inputField);
                                         errorRquired = true;
                                    }
                                    else {
                                        if(!value) {
                                            console.log('not work here', inputField);
                                            errorRquired = true;
                                        } 
                                    }
                                }
                            }

                            var formatedKey = formId + '_' + key.replace('.', '_');
                            gformData[formatedKey] = value;
                        }
                    });

                    if(!errorRquired) {
                        console.log('Trigger for non ajax');
                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push(Object.assign(gformData, {event: 'gravity_form_submit'}));
                    }
                }

            });
        });

        $(document).on('gform_confirmation_loaded', function(event, formId){
            var gformData = localStorage.getItem('gFormData');
            if(gformData) {
                gformData = JSON.parse(gformData);
            }

            window.dataLayer = window.dataLayer || [];

            if(gformData && gformData.formId == formId) {
                console.log('trigger from here');
                dataLayer.push(Object.assign(gformData, {event: 'gravity_form_submit'}));
                localStorage.removeItem('gFormData');
            }else {
                dataLayer.push({event: 'gravity_form_submit', formId: formId});
            }

        });
    });
})(jQuery);
