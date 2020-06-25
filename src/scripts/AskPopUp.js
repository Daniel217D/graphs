export default class AskPopUp {
    constructor(container_id = 'askPopUp') {
        this.container = document.getElementById(container_id);
        this.buttons_container = this.container.getElementsByClassName('js-askPopUp-container')[0];
    }

    //[{value: '', text:''}...]
    ask = (options) => {
        this.buttons_container.innerHTML = '';

        options.forEach(({value, text}) => {
            const child = document.createElement('button');
            child.classList.add('.ask-button');
            child.value = value;
            child.innerText = text;
            this.buttons_container.appendChild(child);
        });

        this.container.classList.remove('hidden');
        return new Promise((res, rej) => {
            this.buttons_container.addEventListener('click', (({target}) => {
                try {
                    if (target.tagName === "BUTTON") {
                        this.container.classList.add('hidden');
                        res(target.value);
                    }
                } catch (e) {
                    rej(e);
                }

            }), {once: true});
        });
    };
}