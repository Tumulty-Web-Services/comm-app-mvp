/*
Documentation

This file holds all the back end calls for system logs

*/

import Axios from 'axios';

import {refreshSystemLogs} from '../../store/reducers/systemLogReducer';

import {createNotificationStandard} from '../misc/notifications';
import { ADMIN_refreshSystemLogs } from '../../sockets';

export function createSystemLog(text, critical, error_code) {

    return new Promise(async(resolve, reject) => {

        try {

            //create a new system log
            await Axios({
                method: 'post',
                url: '/api/system_logs/create',
                data: {
                    text,
                    critical,
                    error_code
                }

            })

            refreshSystemLogs();

            resolve(true)

        } catch (e) {

            console.log('Error ', e)
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Something went wrong creating a system log of the error.');
            resolve(false);

        }

    })

}

export function createSystemLogNotification(text, critical, error_code) {

    return new Promise(async(resolve, reject) => {

        try {

            //create a new system log
            await Axios({
                method: 'post',
                url: '/api/system_logs/create',
                data: {
                    text,
                    critical,
                    error_code
                }

            })

            createNotificationStandard('<span class="text-danger">Whoops!</span>', text);
            refreshSystemLogs();
            ADMIN_refreshSystemLogs()

            resolve(true)

        } catch (e) {

            console.log('Error ', e)
            createNotificationStandard('<span class="text-danger">Whoops!</span>', 'Something went wrong creating a system log of the error.');
            resolve(false);

        }

    })

}