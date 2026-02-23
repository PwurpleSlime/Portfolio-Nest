import { SetMetadata } from "@nestjs/common";

export const IS_CLERK_KEY = 'isClerk'
export const Clerk = () => SetMetadata(IS_CLERK_KEY, true)