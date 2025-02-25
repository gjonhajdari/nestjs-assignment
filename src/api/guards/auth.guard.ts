import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const req: Request = context.switchToHttp().getRequest();

		if (!req.headers["x-api-key"]) return false;
		return true;
	}
}
