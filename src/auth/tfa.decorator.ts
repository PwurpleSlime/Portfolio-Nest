import { SetMetadata } from "@nestjs/common";

export const IS_TFA_KEY = 'isTFA'
export const TFA = () => SetMetadata(IS_TFA_KEY, true)