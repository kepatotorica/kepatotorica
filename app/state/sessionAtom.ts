import { atom } from "jotai";
import { BaseAuthStore } from "pocketbase";

export const sessionAtom = atom<BaseAuthStore>()