
//Declarations
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const cc = document.querySelector('#cc');
const messege = document.querySelector('#messege');
const formulario = document.querySelector('#formulario');
btnSend = document.querySelector('#formulario button[type="submit"]');
btnReset = document.querySelector('#formulario button[type="reset"]');
spinner = document.querySelector('#spinner');


let mails = {
    email: '',
    subject: '',
    messege: ''
}


//Events
email.addEventListener('input', validation);
subject.addEventListener('input', validation);
messege.addEventListener('input', validation);
cc.addEventListener('input', validation);
btnSend.addEventListener('click', sendEmail);
btnReset.addEventListener('click', function (e) {
    e.preventDefault();
    resetForm();

})


//Functions
function validation(e) {

    const ubication = e.target.parentElement;
    const targetId = e.target.getAttribute('id');
    const targetValue = e.target.value.trim();
    const targetName = e.target.name;

    //Check if the field is blank
    if (targetValue === '' && targetName != 'cc') {
        showAlert(`The ${e.target.getAttribute('id')} field is mandatory`, ubication);
        mails[e.target.name] = '';
        checkEmailFill();
        return;
    }

    if (targetId === 'email' || targetId === 'cc') {
        const result = checkValidEmail(e.target.value)
        if (!result) {
            showAlert(`The ${e.target.getAttribute('id')} field is invalid`, ubication);
            mails[e.target.name] = '';
            checkEmailFill();
            if (targetValue === '' && targetId === 'cc') {
                deleteAlert(e.target.parentElement);
                if(mails.cc === ''){
                    delete mails.cc;
                }
                checkEmailFill();
            }
            return;
        }
    }

    deleteAlert(ubication);

    //Fill objet
    mails[e.target.name] = e.target.value.trim();

    checkEmailFill();
}

function showAlert(messege, ubication) {
    //check existence of the email
    deleteAlert(ubication);

    //Create the error alert
    const error = document.createElement('P');
    error.textContent = messege;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'error');
    ubication.appendChild(error);
}

function deleteAlert(ubication) {
    const error = ubication.querySelector('.error');
    if (error) {
        error.remove()
    }
}

function checkValidEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;

}

function checkEmailFill() {
    if (Object.values(mails).includes('')) {
        btnSend.classList.add('opacity-50');
        btnSend.disabled = true;
        return
    };
    btnSend.classList.remove('opacity-50');
    btnSend.disabled = false;
}

function sendEmail(e) {
    e.preventDefault();
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');

    setTimeout(() => {
        spinner.remove();
        resetForm();

        //Create succesful alert
        const succesful = document.createElement('P');
        succesful.textContent = 'Email send succesful';
        succesful.classList.add('bg-green-600', 'text-white', 'p-2', 'text-center', 'succesful');
        formulario.appendChild(succesful);

        setTimeout(() => {
            succesful.remove();
        }, 3000);
    }, 3000);


}

function resetForm() {
    mails.email = '';
    mails.subject = '';
    mails.messege = '';

    formulario.reset();
    checkEmailFill();
}