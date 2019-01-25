module.exports = class UserModel {

    static create(params) {
        if (!this._validateProps(params)){
            return new Promise(reject => {
                reject(this._user);
            })
        }
        this._user = params;
        this._user._id = '1';
        return new Promise(resolve => {
            resolve(this._user);
        })
    }

    static findById(id) {
        return new Promise(resolve => {
            resolve(this._user)

        })
    }

    static findOne(search) {
        if (!this._validateProps(search)) {
            return new Promise(reject => {
                reject(this._user)

            })
        }
        return new Promise(resolve => {
            resolve(this._user)

        })
    }

    static _validateProps(props) {
        if (('name' in props) || ('email' in props) || ('password' in props)) {
            return true;
        } else {
            return false;
        }
    }
} 