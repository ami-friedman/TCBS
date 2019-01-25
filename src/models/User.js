import UserModel from './UserModel'
import error from '../common/errors'


module.exports = class User {
    constructor() {
        this._init();
    }

    async create(userParams) {
        await this._create(userParams);
    }

    async validatePassword(email, password) {
        await this._findByEmail(email);

        if (this._user.email !== email) {
            console.log(error.USER_NOT_FOUND);
            return false;
        }
        if (this._user.password !== password){
            console.log(error.INCORRECT_PASSWORD);
            return false;
        }
        return true;
    }

    async findByEmail(userParams) {
        let foundUser = await this._findByEmail(userParams);
        return this._user;
    }

    async findById(id) {
        let foundUser = await this._findById(id);
        return this._user;
    }

    getId() {
        return this._user._id;
    }

    async _create(params) {
        try {
            let createdUser = await UserModel.create(params);
            if (createdUser) {
                this._populateProps(createdUser);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async _findByEmail(email) {
        try {
            let foundUser = await UserModel.findOne({ email: email });
            this._populateProps(foundUser);
        } catch (error) {
            console.log(error);
        }
    }

    async _findById(id) {
        try {
            let foundUser = await UserModel.findById(id);
            this._populateProps(foundUser);
        } catch (error) {
            console.log(error);
        }
    }

    _init() {
        this._user = {
            name: {
                first: null,
                last: null
            }
        };
        this._user._id = null;
        this._user.email = null;
        this._user.password = null;
    }

    _populateProps(props) {
        console.log('_populateProps: ' + props);
        this._user._id = props._id;
        this._user.name.first = props.name.first;
        this._user.name.last = props.name.last;
        this._user.email = props.email;
        this._user.password = props.password;
    }
}