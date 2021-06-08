import { Request, Response } from 'express';
export class GenericController{

    public async showProcessInfo (req: Request, res: Response) {                
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
        }
        //console.log(`Arr ${arrArgV}`);
        res.render('partials/processInfo', {layout : 'generic', ProcessInfo: response, ListaArgumentos: arrArgV });
               
    }

    

}