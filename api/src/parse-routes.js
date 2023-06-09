/* eslint-disable no-use-before-define */
const swaggerUi = require('swagger-ui-express');

const regexToStr = (regexp) => {
  let str = regexp.toString();
  str = str.replace(/\\\//g, '/');
  str = str.replace(/\\\//g, '/');
  // str = str.replace(/\\/g, '');
  return str.substr(2).split('/?')[0];
};

const convertToSwaggerFormat = (url) => {
  const arr = url.split('/');
  arr.forEach((val, index) => {
    if (val[0] && val[0] === ':') {
      arr[index] = `{${val.substr(1)}}`;
    }
  });
  return arr.join('/');
};

const parseRouter = (app) => {
  const cpApiGroups = {};
  const crmApiGroups = {};
  for (let index = 0; index < app._router.stack.length; index++) {
    const element = app._router.stack[index];
    if (element.name === 'router') {

      const baseUrl = regexToStr(element.regexp);
      //   const routerGroup = {
      //     baseUrl,
      //     groupName: baseUrl.split('/')[baseUrl.split('/').length - 1],
      //     apis: [],
      //   };
      // const groupName = baseUrl.split('/')[baseUrl.split('/').length - 1];
      const innerStack = element.handle;
      for (let ind = 0; ind < innerStack.stack.length; ind++) {
        const upperInnerElement = innerStack.stack[ind];
        let mainUrl = upperInnerElement.regexp.toString().split('?')[0];
        mainUrl = mainUrl.replace('/^', '');
        mainUrl = mainUrl.split('\\').join('');

        mainUrl = mainUrl.substr(0, mainUrl.length - 1);
        for (let valIndx = 0; valIndx < upperInnerElement.handle.stack.length; valIndx++) {
          const innerElement = upperInnerElement.handle.stack[valIndx];
          const url = innerElement.route ? innerElement.route.path : '';
          const apiObj = {
            url: mainUrl + convertToSwaggerFormat(url),
            params: null,
            methods: [],
          };
          if (innerElement.route && innerElement.route.methods) {
              
            apiObj.methods = innerElement.route.methods;
            apiObj.methods = Object.keys(innerElement.route.methods);
          }
          if (innerElement.route && innerElement.route.stack && innerElement.route.methods) {
            for (let counter = 0; counter < innerElement.route.stack.length; counter++) {
              const obj = innerElement.route.stack[counter];
              if (obj.name === '<anonymous>') {
                const req = { headers: { authorization: '' } };
                obj.handle(req, {}, () => {
                  apiObj.params = req.apiParams;
                  apiObj.pathParams = req.pathParams;
                  
                  if (req.isAuth && apiObj.security === undefined) {
                    
                    apiObj.security = [{ bearerAuth: [] }];
                  }
                });
              }
            }
          }
          const body = {};
          const params = [];
          const required = [];
          if (apiObj.pathParams) {
            
            for (let index3 = 0; index3 < apiObj.pathParams.length; index3++) {
              const paramObj = apiObj.pathParams[index3];
              params.push({
                name: paramObj.key,
                in: 'path',
                required: true,
                schema: {
                  type: paramObj.type,
                },
              });
              if (paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required') {
                required.push(paramObj.key);
              }
            }
          }
          if (apiObj.params) {
            for (let index2 = 0; index2 < apiObj.params.length; index2++) {
              const paramObj = apiObj.params[index2];
              if (apiObj.methods[0] === 'get') {
                params.push({
                  name: paramObj.key,
                  in: 'query',
                  required: !!(paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required'),
                  schema: {
                    type: paramObj.type,
                  },
                });
              } else if (typeof (paramObj.type) === 'string') {
                body[paramObj.key] = {
                  required: !!(paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required'),
                  type: paramObj.type,
                };
              } else if (Array.isArray(paramObj.type)) {
                const obj = {};
                paramObj.type.forEach((val) => {
                  obj[val.key] = {
                    required: !!(paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required'),
                    type: val.type,
                  };
                });
                body[paramObj.key] = {
                  required: !!(paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required'),
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: obj,
                  },
                };
              }

              if (paramObj.flags && paramObj.flags.presence && paramObj.flags.presence === 'required') {
                required.push(paramObj.key);
              }
            }
          }

          const tmpParams = {};
          if (apiObj.methods[0] === 'get') {
            tmpParams.parameters = params;
          } else {
            tmpParams.requestBody = {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: body,
                    required,
                  },
                },
              },
            };
          }
          const obj = {
            [apiObj.methods[0]]: {
              tags: [mainUrl],
              // produces: [
              //   'application/json',
              // ],
              security: apiObj.security,
              ...tmpParams,
              // [apiObj.methods[0] === 'get' ? 'params' : 'requestBody']: {
              //   required: true,
              //   content: {
              //     'application/json': {
              //       schema: {
              //         type: 'object',
              //         properties: body,
              //         required,
              //       },
              //     },
              //   },
              // },
              responses: {
                200: {
                  description: '',
                  headers: {},
                },
              },
            },
          };
          if (baseUrl === '/api/v1/cp') {
            cpApiGroups[baseUrl + apiObj.url] = {
              ...obj,
              ...cpApiGroups[baseUrl + apiObj.url],
            };
          } else {
            crmApiGroups[baseUrl + apiObj.url] = {
              ...obj,
              ...crmApiGroups[baseUrl + apiObj.url],
            };
          }
        }
      }
    }
  }
  const strCp = JSON.stringify(cpApiGroups);
  
  const strCrm = JSON.stringify(crmApiGroups);
  const cpSwaggerJson = getSwaggerJson(strCp, true);
  const crmSwaggerJson = getSwaggerJson(strCrm, false);
  
  app.use('/api-docs-crm', swaggerUi.serve, useSchema(JSON.parse(crmSwaggerJson)));
  app.use('/api-docs-cp', swaggerUi.serve, useSchema(JSON.parse(cpSwaggerJson)));
};

const getSwaggerJson = (str, isCp = false) => `
  {
    "openapi": "3.0.1",
    "info": {
      "title": "${isCp ? 'Client Portal APIs' : 'CM APIs'}",
      "contact": {},
      "version": "1.0"
    },
    "servers": [
      {
        "url": "http://localhost:3002/"
      }
    ],
    "paths": {
    ${str.substr(1, str.length - 2)}
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  }
`;

const useSchema = (schema) => (...args) => swaggerUi.setup(schema)(...args);

module.exports = parseRouter;
