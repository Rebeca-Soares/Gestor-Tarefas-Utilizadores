export class SystemConfig {
    private static appName: string = 'Configuração de Sistema';
    private static version: string = '2.1.0';
    private static enviroment: string = 'ambiente';

    static setEnvironment (env: string):void {
        SystemConfig.enviroment = env; 
    }

    //metodo nativo do JS - getInfo()
    static getInfo(): {appName: string, version: string, enviroment:string} {
        return {
            appName: SystemConfig.appName,
            version: SystemConfig.version,
            enviroment: SystemConfig.enviroment
        }
    }
} 