import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const ProfileAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.profile) {
      if (filterData) {
        return request.profile[filterData];
      } else {
        return request.profile;
      }
    } else {
      throw new ForbiddenException(
        'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);
