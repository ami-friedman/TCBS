import UserModel from './__mocks__/UserModel'


module.exports = class User {
    constructor(params) {
        this._init();
    }

    /** Create a new user in DB
     * @param userParams name {first, last}, email, password 
     */
    async create(userParams){
        await this._create(userParams);
    }

    async findByEmail(userParams){
        let foundUser = await this._findByEmail(userParams); 
        return this._user;
    }

    getId(){
        return this._user._id;
    }

    async _create(params){
        try {
            let createdUser = await UserModel.create(params);
            if (createdUser) {
                this._populateProps(createdUser);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async _findByEmail(email){
        try {
            let foundUser = await UserModel.findOne({email: email});
            this._populateProps(foundUser);
        } catch(error){
            console.log(error);
        }
    }

    async _findById(id){
        try {
            let foundUser = await UserModel.findById(id);
            this._populateProps(foundUser);
        } catch(error){
            console.log(error);
        }
    }

    _init(){
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

    _populateProps(props){
        this._user._id = props._id;
        this._user.firstName = props.name.first;
        this._user.lastName = props.name.last;
        this._user.email = props.email;
        this._user.password = props.password;
    }
}