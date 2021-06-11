
async function signupFormHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
console.log(email, password, username);
    if (username && password && email) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json'}
        
        })
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

}
document.querySelector('.signup-form').addEventListener('submit',signupFormHandler);


async function signinFormHandler(event) {
    event.preventDefault();

    const username = document.querySelcector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('sign in should now direct to dashboard')
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.signin-form').addEventListener('submit',signinFormHandler);