"use strict"

/* This file is provided from a Nuget Package, any changes will be replaced by a nuget update/restore */

if (typeof Promise == "undefined")
{
    console.error("Promises are not supported by this browser, consider using a polyfil");
    alert("Promises are not supported by this browser, consider using a polyfil");
}

var LogLevel = Object.freeze({ "debug": 0, "warn": 1, "error": 2 });

var webUtils = (function ()
{
    var LOG_LEVEL = LogLevel.debug; // 0-debug, 1-warn, 2-error

    function removeWordsFromString(value, list)
    {
        var re = new RegExp('\\b(' + list.join('|') + ')\\b', 'g');
        return (value || '').replace(re, '');//.replace(/[ ]{2,}/, ' ');
    }

    function toggleClassInSet(setPrefix, fromClass, toClass)
    {
        var setName = setPrefix + '-set';
        var items = document.querySelectorAll('.' + setName);
        var re = new RegExp('(\\s|\^)(' + (fromClass + "|" + toClass) + ')(\\s|\$)', 'g');
        for (var i = 0; i < items.length; i++)
        {
            items[i].className = items[i].className.replace(re, '') + ' ' + toClass;
        }
    }

    function log(data, logLevel)
    {
        if (logLevel >= webUtils.LOG_LEVEL)
        {
            console.log(data);
        }
    }
    /** 
     * Tries to call a function located in another javascript file that may still be loading.
     * This method will attempt to call the function 10 times, and on each failure, wait 100ms before trying again.
     * If after the last attempt there is still an error, the promise will be rejected.
     * example:
     * @param {Function} fn A function returning the method to be called .
     * @param {any} defaultResponse Default value to return in case of any errors, if none specified, promise will be rejected if there are errors.
     * @param {number} [retryCount=10] The number of times to retry, default is 10.
     * @returns {Promise} Returns a promise with the result produced by {fn}
     */
    function makeCall(fn, defaultResponse, retryCount)
    {
        return new Promise(function (res, rej)
        {
            function handleError(error)
            {
                log("Error calling " + fn, 0);
                log(error, 0);
                if (typeof defaultResponse == 'undefined')
                {
                    rej(error);
                }
                else
                {
                    res(defaultResponse);
                }
            }

            if (typeof retryCount == 'undefined' || retryCount == null)
            {
                retryCount = 10;
            }

            try
            {
                var result = fn();

                res(result);
            }
            catch (error)
            {
                if (error instanceof ReferenceError)
                {

                    if (retryCount < 0)
                    {
                        log("Could not execute call, tried 10 times " + fn, 0);
                        log(error, 0);
                        rej("Could not execute call, tried 10 times " + fn);
                    }
                    else
                    {
                        setTimeout(function ()
                        {
                            makeCall(fn, defaultResponse, retryCount - 1).then(res).catch(handleError);
                        }, 100);
                    }
                }
                else
                {
                    handleError(error);
                }
            }
        });
    }

    function RetrieveCacheData(cacheKey)
    {
        if (cacheKey.indexOf(webUtils.APP_NAME) != 0)
        {
            cacheKey = webUtils.APP_NAME + "_" + cacheKey;
        }
        var data = localStorage.getItem(cacheKey);
        return Promise.resolve(data).then(function (data)
        {
            if (data != null && data.length > 0)
            {
                try
                {
                    data = JSON.parse(atob(data)); // base64 decode and then json parse
                }
                catch (error)
                {
                    log('error trying to parse and decode data from cache ' + cacheKey, 1);
                    log(error, 1);
                }
            }
            return Promise.resolve(data);
        });
    }

    function StoreCacheData(cacheKey, data)
    {
        if (cacheKey.indexOf(webUtils.APP_NAME) != 0)
        {
            cacheKey = webUtils.APP_NAME + "_" + cacheKey;
        }

        data = btoa(JSON.stringify(data)); // json serialize and then base64 encode

        localStorage.setItem(cacheKey, data);
        return Promise.resolve();
    }

    function retrieveOrUseCache(cacheKey, fn)
    {
        if (cacheKey.indexOf(webUtils.APP_NAME) != 0)
        {
            cacheKey = webUtils.APP_NAME + "_" + cacheKey;
        }

        return makeCall(fn).then(function (data)
        {
            if (typeof data != "undefined" && data != null)
            {
                log('storing data in local storage for ' + cacheKey, 0);
                return StoreCacheData(cacheKey, data).then(function (res2)
                {
                    return Promise.resolve(data);
                });
            }
            else
            {
                log('not storing data for ' + cacheKey + ' because result is empty', 0);
                return Promise.resolve(data);
            }
        }).catch(function (error)
        {
            log('unable to get data for ' + cacheKey + ' using ' + fn + ', will try and use cached value', 1);
            log(error, 0);
            return RetrieveCacheData(cacheKey);
        });
    }

    function updateClassCollection(setPrefix, classes)
    {
        var setName = setPrefix + '-set';
        var items = document.querySelectorAll('.' + setName);

        var state;

        if (Array.isArray(classes))
        {
            log('classes is a list', 0);
            state = classes.join(' ');
        }
        else
        {
            log('classes is not a list', 0);
            state = classes;
        }

        var classNames = items[0].className;
        var classItems = classNames.split(' ');
        var classesToRemove = [];

        var regex = new RegExp('(^|\s)' + setPrefix + '-'); // only consider class names that start with the setPrefix
        for (var i = 0; i < classItems.length; i++)
        {
            var className = classItems[i];
            if (className == null || className.length == 0 || className.trim().length == 0 || className == setName)
            {
                continue;
            }
            if (className.search(regex) > -1)
            {
                classesToRemove.push(className);
            }
        }

        for (var i = 0; i < items.length; i++)
        {
            items[i].className = webUtils.removeWordsFromString(items[i].className, classesToRemove) + ' ' + state;
        }

        return Promise.resolve();
    }

    function getValueOrDefault(value, defaultValue, allowNull)
    {
        if (typeof value != 'undefined' && (value != null || allowNull == true))
        {
            return value;
        }

        if (typeof defaultValue == 'undefined')
        {
            log('Default value is undefined and should not be, will return null', 1);
            return null;
        }

        return defaultValue;
    }

    function guid()
    {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return {
        callFunction: makeCall,
        retrieveOrUseCache: retrieveOrUseCache,
        retrieveCacheData: RetrieveCacheData,
        storeCacheData: StoreCacheData,
        LOG_LEVEL: LOG_LEVEL,
        APP_NAME: "",
        log: log,
        removeWordsFromString: removeWordsFromString,
        updateClassCollection: updateClassCollection,
        toggleClassInSet: toggleClassInSet,
        getValueOrDefault: getValueOrDefault,
        guid: guid,
    }
})();