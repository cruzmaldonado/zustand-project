import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
//import { customSessionStorage } from "../storages/session.store";
import { firebaseStorage } from "../storages/firebase.storage";

interface PersonStore {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonStore & Actions ,  [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",


    //? estado... }), false , "nombre" es para usar las devtool y poder nombrar al modificador del estado

  setFirstName: (value: string) => set(({ firstName: value }),false,'setFirstName'),
  setLastName: (value: string) => set( ({ lastName: value }),false,'setFirstName'),
})

export const usePersonStore = create<PersonStore & Actions>()(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      //storage:customSessionStorage,     //esto para guaradarlo en session storage
      storage: firebaseStorage,
    })
  )
);

//persist es una propiedad que nos permite persistes los datos
// en el local storage para qeu se guarden en el navegador y no se
// pierdan cuando se reinia el nevagador por ejemplo.

//? sessionStorage funciona igual que persist pero esto lo
//? guarda en el session storage y no en el  local storage
//? este tambien persiste los datos cuando reinicia el navegador
//? pero se borran cuando apagas el equipo o cierrar el nabegador
//? session storage requiere 3 propiedades que se pueden añadir
//? mamualmente con CRT .

// storage espera que le envie un createJSONStorage se lo damos y luegos
// llamamos una callback y llamamos al sessionStorage


//? el middleware devtools nos ayuda a ver el estado con ayuda de las
//? herramientas de desarrollo redux devtools 