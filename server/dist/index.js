"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Comment_1 = require("./entities/Comment");
const Organization_1 = require("./entities/Organization");
const Project_1 = require("./entities/Project");
const Ticket_1 = require("./entities/Ticket");
const User_1 = require("./entities/User");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 4000,
        username: 'postgres',
        password: 'postgres',
        database: 'BugTracker',
        entities: [User_1.User, Ticket_1.Ticket, Project_1.Project, Organization_1.Organization, Comment_1.Comment],
        synchronize: true,
        logging: true,
    });
});
main();
//# sourceMappingURL=index.js.map