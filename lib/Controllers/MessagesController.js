/**
 * FlowrouteNumbersAndMessagingLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io )
 */

'use strict';

const _request = require('../Http/Client/RequestClient');
const _configuration = require('../configuration');
const _apiHelper = require('../APIHelper');
const _baseController = require('./BaseController');

class MessagesController {
    /**
     * Retrieves a list of Message Detail Records (MDRs) within a specified date range. Date and
     * time is based on Coordinated Universal Time (UTC).
     *
     * @param {dateTime} startDate The beginning date and time, in UTC, on which to perform an MDR
     * search. The DateTime can be formatted as YYYY-MM-DDor YYYY-MM-
     * DDTHH:mm:ss.SSZ.
     * @param {dateTime} endDate (optional) The ending date and time, in UTC, on which to perform
     * an MDR search. The DateTime can be formatted as YYYY-MM-DD or YYYY-
     * MM-DDTHH:mm:ss.SSZ.
     * @param {int} limit (optional) The number of MDRs to retrieve at one time. You can set as
     * high of a number as you want, but the number cannot be negative and must
     * be greater than 0 (zero).
     * @param {int} offset (optional) The number of MDRs to skip when performing a query. The
     * number must be 0 (zero) or greater, but cannot be negative.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getLookUpASetOfMessages(startDate, endDate, limit, offset, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _queryBuilder = `${_baseUri}${'/v2.1/messages'}`;

        // process query parameters
        _queryBuilder = _apiHelper.appendUrlWithQueryParameters(_queryBuilder, {
            start_date: _apiHelper.stringifyDateTime(startDate, 'rfc3339'),
            end_date: _apiHelper.stringifyDateTime(endDate, 'rfc3339'),
            limit,
            offset,
        });

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                let response = '';
                if (_context.response.body) {
                    response = JSON.parse(_context.response.body);
                }
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    _callback(null, _response.body, _context);
                    _fulfill(_response.body);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'Unauthorized – There was an issue with your API credentials.';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized – There was an issue with your API credentials.',
                        errorCode: 401,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'The specified resource was not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'The specified resource was not found',
                        errorCode: 404,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }

    /**
     * Sends an SMS or MMS from a Flowroute long code or toll-free phone number to another valid
     * phone number.
     *
     * @param {Message} body The SMS or MMS message to send.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createSendAMessage(body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        const _queryBuilder = `${_baseUri}${'/v2.1/messages'}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            'content-type': 'application/json; charset=utf-8',
        };

        // remove null values
        _apiHelper.cleanObject(body);

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                let response = '';
                if (_context.response.body) {
                    response = JSON.parse(_context.response.body);
                }
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    _callback(null, _response.body, _context);
                    _fulfill(_response.body);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'Unauthorized – There was an issue with your API credentials.';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized – There was an issue with your API credentials.',
                        errorCode: 401,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 403) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'Forbidden – You don\'t have permission to access this resource.';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Forbidden – You don\'t have permission to access this resource.',
                        errorCode: 403,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'The specified resource was not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'The specified resource was not found',
                        errorCode: 404,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 422) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'Unprocessable Entity - You tried to enter an incorrect value.';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unprocessable Entity - You tried to enter an incorrect value.',
                        errorCode: 422,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }

    /**
     * Searches for a specific message record ID and returns a Message Detail Record (in MDR2
     * format).
     *
     * @param {string} id The unique message detail record identifier (MDR ID) of any message. When
     * entering the MDR ID, the number should include the mdr2- preface.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getLookUpAMessageDetailRecord(id, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _queryBuilder = `${_baseUri}${'/v2.1/messages/{id}'}`;

        // process template parameters
        _queryBuilder = _apiHelper.appendUrlWithTemplateParameters(_queryBuilder, {
            id,
        });

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                let response = '';
                if (_context.response.body) {
                    response = JSON.parse(_context.response.body);
                }
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    let parsed = JSON.parse(_response.body);
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'MDR2');
                    _callback(null, parsed, _context);
                    _fulfill(parsed);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'Unauthorized – There was an issue with your API credentials.';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized – There was an issue with your API credentials.',
                        errorCode: 401,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper().mapObject(response, 'ErrorException');
                    mappedObject.reason = 'The specified resource was not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'The specified resource was not found',
                        errorCode: 404,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }

}

module.exports = MessagesController;