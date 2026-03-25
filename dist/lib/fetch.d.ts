export declare const BACKEND_URL = "https://rapidapi-backend-production.up.railway.app";
export declare function mcpFetch(url: string, options?: RequestInit): Promise<any>;
export declare function text(data: any): {
    content: {
        type: "text";
        text: string;
    }[];
};
export declare function err(msg: string): {
    isError: boolean;
    content: {
        type: "text";
        text: string;
    }[];
};
export declare function result(data: any): any;
