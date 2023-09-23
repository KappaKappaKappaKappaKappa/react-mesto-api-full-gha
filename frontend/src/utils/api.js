class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkAnswer(res) {
        return res.ok ? res.json() : Promise.reject()
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: "include"
        })
            .then(this._checkAnswer)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            credentials: "include"
        })
            .then(this._checkAnswer)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkAnswer)
    }

    setNewAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkAnswer)
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(this._checkAnswer)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then(this._checkAnswer)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                credentials: "include"
            })
                .then(this._checkAnswer)
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "DELETE",
                credentials: "include"
            })
                .then(this._checkAnswer)
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.project.mesto.nomoredomainsrocks.ru',
    // baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;
