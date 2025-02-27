import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export class MockAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		return true;
	}
}
