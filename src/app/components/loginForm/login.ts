//Switch between login to signup || signup to login on click
export function switching(){
    (document.querySelector("#active-login") as HTMLElement).addEventListener('click', (e) => {
        e.preventDefault();
        (document.querySelector('.active-form') as HTMLElement).classList.remove('active-form');
        (document.querySelector('.active-stuff') as HTMLElement).classList.remove('active-stuff');
        (document.querySelector("#active-login") as HTMLElement).classList.add('active-form');
        (document.querySelector('#login-stuff') as HTMLElement).classList.add("active-stuff")
    });
    (document.querySelector("#active-signup") as HTMLElement).addEventListener('click', (e) => {
         e.preventDefault();
        (document.querySelector('.active-form') as HTMLElement).classList.remove('active-form');
        (document.querySelector('.active-stuff') as HTMLElement).classList.remove('active-stuff');
        (document.querySelector("#active-signup") as HTMLElement).classList.add('active-form');
        (document.querySelector('#signup-stuff') as HTMLElement).classList.add("active-stuff")
    });
}
