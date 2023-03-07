import {getRawType, RawType} from "./tool";

export type LogType = "primary" | "success" | "warn" | "error" | "info" | "default"
export type LogTypeColor = "#2d8cf0" | "#19be6b" | "#ff9900" | "#f03f14" | "#909399" | "#35495E"

export class Logger {
    constructor() {}

    static types: LogType[] = ["primary", "success", "warn", "error", "info"]
    static typeColor(type: LogType): LogTypeColor {
        switch (type) {
            case "primary":
                return "#2d8cf0";
            case "success":
                return "#19be6b";
            case "info":
                return "#909399";
            case "warn":
                return "#ff9900";
            case "error":
                return "#f03f14";
            default:
                return "#35495E";
        }
    }

    static rawType(val: any): undefined {
        return Logger.printBack(getRawType(val))
    }

    static isArray(val: any): RawType {
        return getRawType(val)
    }

    static print (type: LogType = "default", text: any, back: boolean = false): undefined {
        if (typeof text === "object") {
            // 如果是對象則調用打印對象方式
            Logger.isArray(text) ? console.table(text) : console.dir(text);
            return;
        }
        if (back) {
            // 如果是打印帶背景圖的
            console.log(`%c ${text} `, `background:${Logger.typeColor(type)}; padding: 2px; border-radius: 4px; color: #fff;`);
        } else {
            console.log(
                `%c ${text} `,
                `border: 1px solid ${Logger.typeColor(type)};
                 padding: 2px; border-radius: 4px;
                 color: ${Logger.typeColor(type)};`
            );
        }
    }

    static printBack(text: any, type: LogType = "primary"): undefined {
        return Logger.print(text, type, true);
    }

    static pretty(title: string, text: any, type: LogType = "primary") {
        if (typeof text === "object") {
            console.group("Console Group", title);
            console.log(
                `%c ${title}`,
                `background:${Logger.typeColor(type)};border:1px solid ${Logger.typeColor(type)};
                 padding: 1px; border-radius: 4px; color: #fff;`
            );
            Logger.isArray(text) ? console.table(text) : console.dir(text);
            console.groupEnd();
            return;
        }
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${Logger.typeColor(type)};border:1px solid ${Logger.typeColor(type)};
             padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
            `border:1px solid ${Logger.typeColor(type)};
             padding: 1px; border-radius: 0 4px 4px 0; color: ${Logger.typeColor(type)};`,
            "background:transparent"
        );
    }

    static prettyPrimary(title: string, ...text: any[]): void {
        text.forEach(t => Logger.pretty("primary", title, t));
    }

    static prettySuccess(title: string, ...text: any[]): void {
        text.forEach(t => Logger.pretty("success", title, t));
    }

    static prettyWarn(title: string, ...text: any[]): void {
        text.forEach(t => Logger.pretty("warn", title, t));
    }

    static prettyError(title: string, ...text: any[]): void {
        text.forEach(t => Logger.pretty("error", title, t));
    }

    static prettyInfo(title: string, ...text: any[]): void {
        text.forEach(t => Logger.pretty("info", title, t));
    }
}
export default Logger
