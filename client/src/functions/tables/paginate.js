/*
Documentation
A pagination class that handles data, similar to datatables.net

base init:
//default values to show it 10 and offset is 0
const paginate = new Paginate({}, logs.payload);

//for custo offsets and data to show pass in show and offset settings
const paginate = new Paginate({
    show: 5, //shows 5 results per page
    offset: 5, start on the 5th offset
}, logs.payload);


*/

import {cloneArrayOfObjects} from '../../functions/misc/clones';

export class Paginate {
    constructor(settings, data) {

        if (!settings.show) {
            settings.show = 10;
        }

        settings.sort = 'alp_desc';
        settings.row = '';

        if (!settings.offset) {
            settings.offset = 0;
        }

        let length = 0;
        if (data) {
            length = data.length
        }

        //data to be untouched in filtering
        this.dataUntouched = data;

        //set data that can be filtered and manipulated
        this.data = data;

        //set the settings
        this.settings = settings;
        this.hasNext = false;
        this.hasPrevious = false;
        this.dataCount = length
        this.currentEntry = 1
        this.currentEnd = 1 + settings.show
        this.possibleFilters = ['id']

        this.dataToShow = [{}];
    }

    //run the paginate class
    run() {

        let end = this.settings.show + this.settings.offset;

        let start = this.settings.offset;

        let nextDataSetIndex = end;
        let previousDataSetIndex = start - 1;

        let currentEntryEnd = start + this.settings.show;

        if (this.data) {
            const filteredData = this
                .data
                .slice(start, end);

            //set default has more to true
            this.hasNext = true;
            this.hasPrevious = true;

            //if start is less than 0 set it to 0
            if (start < 0) {
                start = 0;
            }

            if (end < 2) {
                end = 1;
            }

            //tell if we have more data
            if (!this.data[nextDataSetIndex]) {
                this.hasNext = false;
            }

            //tell if we have previous data
            if (!this.data[previousDataSetIndex]) {
                this.hasPrevious = false;
            }

            if (currentEntryEnd > this.data.length) {
                currentEntryEnd = this.data.length
            }

            this.currentEntry = start + 1;
            this.currentEntryEnd = currentEntryEnd;
            this.dataCount = this.data.length;

            this.dataToShow = filteredData

            return {data: filteredData}
        } else {
            this.dataToShow = [{}]
            return {data: ''}
        }

    }

    //increment data to show by this.settings.show
    paginateNext(boundThis) {


        this.settings.offset = this.settings.offset + this.settings.show;
        const dataSet =  this.run();

        // console.log(dataSet)
        // console.log(dataSet.data)

        boundThis.setState({dataToShow: dataSet.data})

        return dataSet

    }

    //decrement data to show by this.settings.show
    paginatePrevious(boundThis) {

        this.settings.offset = this.settings.offset - this.settings.show;
       
        const dataSet =  this.run();

        boundThis.setState({dataToShow: dataSet.data})

        return dataSet
    }

    //filter data by callback function, set offset to 0
    runFilter(callback) {

        if (callback === '') {
            this.data = this.dataUntouched;
        } else {

            const untouched = cloneArrayOfObjects(this.dataUntouched);;

            this.data = untouched.filter((e) => callback(e));
        }

        this.settings.offset = 0;
        return this.run();

    }

    search (e, value, boundThis) {

        let filter = value;

        if(!filter) {

            try {
                filter = e.target.value;
            } catch(e) {
                filter = ''
            }

       
        }

        let data = this.dataUntouched;


        //if we have a filter value
        if(filter) {

            //create a new array to filter

            //filter our data
            data = data.filter((row) => {

                //get our possible filters
                let possibleFilters = this.possibleFilters;

                //loop through filters
                for (let i = 0; i < possibleFilters.length; i++) {

                    //set filter in variable
                    let toFilter = possibleFilters[i];
                    
                    //if we have a value
                    if(row[toFilter]) {

                        //try to match a lowercase stringified version of the value to the filter
                        if(row[toFilter].toString().toLowerCase().includes(filter)) {

                            return true
                        }
                    }
                    
                }

                return false;

            })

            this.settings.row = '';

        }
        
        this.data = data;
        this.settings.offset = 0;


        //run the paginate class
        const dataSet = this.run();

        // this.sort.alphabetical(this.settings.row)
        boundThis.setState({dataToShow: dataSet.data, filter})

       return dataSet.data;


    }

    sort (row, boundThis) {

        let found_table

        

        //if sorting by alphabeticall ascending order
        if (this.settings.sort === 'alp_asc') {

            found_table = this
                .data
                .sort(function (a, b) {

                    //protect against null values
                    if (!b[row]) {
                        return -1;
                    }

                    if (!a[row]) {
                        return + 1;
                    }

                    if (typeof b[row] === 'number') {
                        return b[row] - a[row];
                    }

                    //return the compare value
                    return b[row]
                        .toString()
                        .localeCompare(a[row].toString());
                });

            this.settings.sort = 'alp_desc';

        } else {

            found_table = this
                .data
                .sort(function (a, b) {

                    //protect against null values
                    if (!a[row]) {
                        return -1;
                    }

                    if (!b[row]) {
                        return + 1;
                    }

                    if (typeof b[row] === 'number') {
                        return a[row] - b[row];
                    }

                    //return the compare value
                    return a[row]
                        .toString()
                        .localeCompare(b[row].toString());
                });

            this.settings.sort = 'alp_asc';

        }

        this.settings.row = row;

        this.data = found_table;
        this.settings.offset = 0;

       

        //run the paginate class
        const dataSet = this.run();

        console.log(dataSet)

        // this.search(this.settings.row, this.filter)

        boundThis.setState({dataToShow: dataSet.data})

        return dataSet.data;

    }

    getHeadClassName (colName) {
        let className = 'pag__not-filtered';

        if(this.settings.row === colName) {
            className = 'pag_active'

            if(this.settings.sort === 'alp_desc') {
                className += ' desc'
            } else if (this.settings.sort === 'alp_asc') {
                className += ' asc'
            }

        }

        return className;
    }

}

// Socket.on('event', function(data){}); socket.on('disconnect', function(){});

export default Paginate;
