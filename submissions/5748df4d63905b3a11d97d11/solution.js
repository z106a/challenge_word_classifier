"use strict";module.exports={};var dictionary;module.exports.init=function(e){dictionary=e.toString()},module.exports.test=function(e){var t=e.toLowerCase().replace(/'s$/,"").replace(/s$/,"").replace(/[aeiouyrnc]/g,"");return""===t?!1:-1!==dictionary.indexOf(t)?!0:!1};