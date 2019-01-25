import Model from './BudgetModel'
import error from '../common/errors'
import { truncate } from 'fs';


module.exports = class Budget {
    constructor(userId) {
        this._init();
    }

    async create(params) {
        await this._create(params);
    }

    async findById(id) {
        await this._findById(id);
    }

    getId() {
        return this._id;
    }

    async findByUserId(userId) {
        console.log('findByUserId: userId:',userId)
        await this._findByUserId(userId);
        return this._generateBudgetObj();
    }

    async _create(params) {
        try {
            let newItem = await Model.create(params);
            if (newItem) {
                this._populateProps(newItem);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async _findById(id) {
        try {
            let foundBudget = await Model.findById(id);
            if (foundBudget) {
                this._populateProps(foundBudget);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async _findByUserId(userId) {
        let foundBudget;
        try {
            foundBudget = await Model.findOne({userId: userId});
            if (foundBudget) {
                this._populateProps(foundBudget);
            }
        } catch (err) {
            console.log(err);
        }
    }

    _generateBudgetObj(){
        return {
            id: this._id,
            '1': this['1'],
            '2': this['2'],
            '3': this['3'],
            total: this.total,
            userId: this.userId,
        }
    }

    _init() {
        this._id = null;
        this['1'] = [];
        this['2'] = [];
        this['3'] = [];
        this.total = 0;
        this.userId = null;

    }

    _populateProps(props) {
        console.log('_populateProps: ' + props);
        this._id = props._id;
        this['1'] = props['1'];
        this['2'] = props['2'];
        this['3'] = props['3'];
        this.total = 0; //dynamicall calculate this with an aggregator
        this.userId = props.userId;
    }
}