import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    return String(context.switchToHttp().getRequest().params.id);
  },
);
