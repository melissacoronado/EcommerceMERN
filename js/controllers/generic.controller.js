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
exports.GenericController = void 0;
class GenericController {
    showProcessInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                Plataform: process.platform,
                NodeVer: process.version,
                MemoryUse: process.memoryUsage(),
                PathExec: process.env['PATH'],
                ProcessId: process.pid,
                FolderC: process.cwd(),
                numCpus: require('os').cpus().length
            };
            //console.log(response);
            let arrArgV1 = process.argv[0];
            let arrArgV2 = process.argv[1];
            let arrArgV = {
                arg1: arrArgV1,
                arg2: arrArgV2
            };
            //console.log(`Arr ${arrArgV}`);
            res.render('partials/processInfo', { layout: 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });
        });
    }
}
exports.GenericController = GenericController;
