module.exports = class UserModel {

    static create(params){
        this._user = {
            _id: '1',
            name: {
                first: 'ami',
                last: 'friedman',
            },
            email: 'amishosh@gmail.com',
            password: '1234'

        }
        params._id = '1';
        return new Promise(resolve => {
            resolve(params);
        })
    }

    static findById(id){
        return new Promise( resolve => {
            resolve(this._user)

        })
    }

    static findOne(search){
        return new Promise( resolve => {
            resolve(this._user)

        })
    }
} 