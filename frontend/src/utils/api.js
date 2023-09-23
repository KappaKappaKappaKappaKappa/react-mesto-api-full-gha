class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._token = options.headers.authorization;
    }

    _checkAnswer(res) {
        return res.ok ? res.json() : Promise.reject()
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkAnswer)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkAnswer)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
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
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkAnswer)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    authorization: this._token
                }
            })
                .then(this._checkAnswer)
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: {
                    authorization: this._token
                }
            })
                .then(this._checkAnswer)
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.project.mesto.nomoredomainsrocks.ru',
    headers: {
        authorization: 'a069766e-f2cf-4169-8365-de2d06b0c981',
        'Content-Type': 'application/json'
    }
})

export default api;
