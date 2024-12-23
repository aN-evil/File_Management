import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonResponse } from '../types/response.types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<CommonResponse> {
        return next.handle().pipe(
            map((data) => {
                let message = '';
                // eslint-disable-next-line no-prototype-builtins
                if (data && data.hasOwnProperty('message')) {
                    message = data.message;
                    delete data.message;
                }
                return {
                    success: true,
                    status: 200,
                    error: '',
                    data: data,
                    message: message,
                };
            }),
        );
    }
}
