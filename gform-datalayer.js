/**
* Author: Md Hasanuzzamna
* Email: webhasan24@gmail.com
* Linkedin: https://linkedin.com/md-h
* Website: https://leomeasure.com
* Last Update: 07 Dec 2023
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
                            var formattedKey = key.replace('.', '_');
                            gformData[formattedKey] = value;
                        }
                    });
                    localStorage.removeItem('gFormData');
                    localStorage.setItem('gFormData', JSON.stringify(gformData));
                }else {
                     var errorRequired = false;

                     formData.forEach(function (value, key) {
                        if(key) {
                            var inputField = form.querySelector('[name="'+key+'"]');

                            if(inputField) {
                                var isRequiredField = inputField.getAttribute('aria-required') === 'true';

                                if(isRequiredField) {

                                    if(inputField.tagName === 'SELECT') {
                                        var selectedOptionVal = inputField.options[inputField.selectedIndex].text;
                                        if(!selectedOptionVal) {
                                            errorRequired = true;
                                        }
                                    }else if((inputField.getAttribute('type') === 'email') && (!value || !value.includes('@'))) {
                                         errorRequired = true;
                                    }
                                    else if(!value) {
                                        errorRequired = true;
                                    }
                                }
                            }

                            var formattedKey = key.replace('.', '_');
                            gformData[formattedKey] = value;
                        }
                    });

                    var requiredCheckboxesRadio = form.querySelectorAll('.gfield--type-checkbox.gfield_contains_required, .gfield--type-radio.gfield_contains_required');
                    requiredCheckboxesRadio.forEach(function(fieldSet) {
                        if(fieldSet.querySelector('input[type="radio"]') || fieldSet.querySelector('input[type="checkbox"]')) {
                            if(!fieldSet.querySelector('input:checked')) {
                                errorRequired = true;
                            }
                        }
                    });

                    if(!errorRequired) {
                        window.dataLayer = window.dataLayer || [];
                        delete gformData['state_1'];
                        dataLayer.push({event: 'gravity_form_submit', inputs: gformData});
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
                delete gformData['state_1'];
                dataLayer.push({event: 'gravity_form_submit', formId: formId, inputs: gformData});
                localStorage.removeItem('gFormData');
            }else {
                dataLayer.push({event: 'gravity_form_submit', formId: formId});
            }

        });
    });
})(jQuery);







