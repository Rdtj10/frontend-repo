"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var action_1 = require("'store/action'");
var reducers_1 = require("'store/reducers'");
var MainSection = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState({}), loadingRows = _a[0], setLoadingRows = _a[1];
    var _b = react_1.useState(null), editMode = _b[0], setEditMode = _b[1];
    var _c = react_1.useState({
        name: "",
        email: ""
    }), formData = _c[0], setFormData = _c[1];
    var usersData = react_redux_1.useSelector(function (state) { return state.user.data; });
    var error = react_redux_1.useSelector(function (state) { return state.user.error; });
    var refresher = react_redux_1.useSelector(function (state) { return state.user.refresher; });
    var _d = react_1.useState(false), dataFetched = _d[0], setDataFetched = _d[1];
    var handleFetch = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingRows(function (prev) { return (__assign(__assign({}, prev), { "fetching": true })); }); // Set loading state
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, dispatch(action_1.fetchUsersData()).unwrap()];
                case 2:
                    _a.sent();
                    setDataFetched(true);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to fetch users:", err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoadingRows(function (prev) { return (__assign(__assign({}, prev), { "fetching": false })); }); // Reset loading state
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleUpdate = function (documentId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingRows(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[documentId] = true, _a)));
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, dispatch(action_1.updateUserData({ data: formData, documentId: documentId })).unwrap()];
                case 2:
                    _a.sent();
                    dispatch(reducers_1.setRefresher());
                    setEditMode(null);
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.error("Failed to update user:", err_2);
                    return [3 /*break*/, 5];
                case 4:
                    setLoadingRows(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[documentId] = false, _a)));
                    });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (user) {
        setEditMode(user.id);
        setFormData({ name: user.name, email: user.email });
    };
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            if (dataFetched) {
            }
        });
    });
};
