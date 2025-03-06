var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/core/callback.creator.ts
function createCallback(controller) {
  return (req, res, next) => __async(this, null, function* () {
    try {
      const response = yield controller(req, next);
      response.cookies.forEach((val, key) => {
        var _a;
        res.cookie(key, val.value, (_a = val.options) != null ? _a : {});
      });
      res.status(response.statusCode).setHeaders(response.headers).json({
        success: true,
        body: response.body,
        message: response.message
      });
    } catch (error) {
      if (process.env.NODE_ENV === "dev") {
        console.log("error from createCallback :", error);
      }
      next(error);
    }
  });
}

// src/core/errors.extended.ts
var AppError = class extends Error {
  constructor(message, statusCode, body, error) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;
    this.error = error;
    this.statusCode = statusCode;
    this.body = body;
    this.error = error;
  }
};
var BadRequestError = class extends AppError {
  constructor(message = "Bad request", statusCode = 400, error) {
    super(message, statusCode, {}, error);
  }
};
var ConflictError = class extends AppError {
  constructor(message = "Conflict error", statusCode = 409) {
    super(message, statusCode);
  }
};
var UnauthorizedError = class extends AppError {
  constructor(message = "Unauthorized access", statusCode = 401, body, error) {
    super(message, statusCode, body, error);
  }
};
var TokenError = class extends AppError {
  constructor(message, statusCode = 401, error) {
    super(message, statusCode, void 0, error);
    this.error = error;
    this.error = error;
  }
};
var InternalServerError = class extends AppError {
  constructor(message = "Internal Server error", statusCode = 500) {
    super(message, statusCode);
  }
};
var ValidationError = class extends AppError {
  constructor(message = "Input Validation Error", statusCode = 400) {
    super(message, statusCode);
  }
};
var DatabaseOpError = class extends AppError {
  constructor(message = "Database Operation Error", statusCode = 503) {
    super(message, statusCode);
  }
};
var EnvNotFoundError = class extends Error {
  /**
   * Creates an instance of EnvNotFoundError.
   * 
   * @param {string} key - The key of the environment variable that was not found or has an invalid value.
   * @param {string} service - The name of the service that requires the environment variable.
   */
  constructor(key, service) {
    super(`key ${key} has invalid ENV value from ${service}`);
  }
};

// src/core/env.validator.ts
var validateEnv = (envObj, serviceName) => {
  for (let key in envObj) {
    if (envObj[key] === void 0) {
      throw new EnvNotFoundError(key, serviceName);
    }
  }
  console.log("ENV's set correctly");
};

// src/core/global-error.handler.ts
function globalErrorHadler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Unknown Internal Server Error",
      body: err.body || null,
      error: err.error
    });
  } else if (err instanceof EnvNotFoundError) {
    console.log("application gonna crash due to invalid Env's");
    throw err;
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

// src/core/response.creator.ts
var _statusCode, _message, _body, _headers, _cookies;
var ResponseCreator = class {
  constructor() {
    __privateAdd(this, _statusCode);
    __privateAdd(this, _message);
    __privateAdd(this, _body);
    __privateAdd(this, _headers);
    __privateAdd(this, _cookies);
    __privateSet(this, _statusCode, 200);
    __privateSet(this, _headers, /* @__PURE__ */ new Map());
    __privateSet(this, _cookies, /* @__PURE__ */ new Map());
  }
  setStatusCode(statusCode) {
    __privateSet(this, _statusCode, statusCode);
    return this;
  }
  setHeader(key, value) {
    var _a;
    (_a = __privateGet(this, _headers)) == null ? void 0 : _a.set(key, value);
    return this;
  }
  setCookie(name, value, options) {
    __privateGet(this, _cookies).set(name, {
      value,
      options
    });
    return this;
  }
  setMessage(message) {
    __privateSet(this, _message, message);
    return this;
  }
  setData(body) {
    __privateSet(this, _body, body);
    return this;
  }
  get() {
    return {
      statusCode: __privateGet(this, _statusCode),
      body: __privateGet(this, _body),
      headers: __privateGet(this, _headers),
      message: __privateGet(this, _message)
    };
  }
};
_statusCode = new WeakMap();
_message = new WeakMap();
_body = new WeakMap();
_headers = new WeakMap();
_cookies = new WeakMap();
export {
  AppError,
  BadRequestError,
  ConflictError,
  DatabaseOpError,
  EnvNotFoundError,
  InternalServerError,
  ResponseCreator,
  TokenError,
  UnauthorizedError,
  ValidationError,
  createCallback,
  globalErrorHadler,
  validateEnv
};
