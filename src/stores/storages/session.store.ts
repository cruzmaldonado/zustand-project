import { StateStorage,createJSONStorage } from "zustand/middleware";

const storageApi : StateStorage ={
    getItem: function (name: string): string | null | Promise<string | null> {
        //guardamo el valor inicial que esta en session stora en data
        const data =sessionStorage.getItem(name);
        return data
    },
    setItem: function (name: string, value: string): void {
        // nos muestra el valor de session staora que tiene la llave name
        sessionStorage.setItem(name,value)
    },
    removeItem: function (name: string):void | Promise<void> {
        console.log("removeItem", name)
    }
}

export const customSessionStorage =createJSONStorage(()=>storageApi) 