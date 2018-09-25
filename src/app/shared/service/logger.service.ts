import { Injectable } from "@angular/core";

@Injectable()
export class Logger {

    constructor() {

    }

    /* 
        Used for debugging.
    */
    debug(className: string, methodName: string, message: string) {
        console.debug("[" + className + "][" + methodName + "] " + message);
    }

    /* 
        Information Logger
    */
    info(className: string, methodName: string, message: string) {
        console.log("[" + className + "][" + methodName + "] " + message);
    }

    /* 
        Warning Logger
    */
    warn(className: string, methodName: string, message: string) {
        console.warn("[" + className + "][" + methodName + "] " + message);
    }

    /* 
        Error Logger
    */
    error(className: string, methodName: string, message: string) {
        console.log("[" + className + "][" + methodName + "] " + message);
    }
}