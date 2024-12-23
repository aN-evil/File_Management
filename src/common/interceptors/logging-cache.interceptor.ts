import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingCacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // Log the cache key for the request
        const cacheKey = `recipes_${request.query.page || 1}_${request.query.limit || 10}`;
        console.log(`Request to get recipes - Key: ${cacheKey}`);

        return next.handle().pipe(
            tap((data) => {
                const source = data && data.source ? data.source : 'unknown'; // Get the source from the data
                console.log(`Response Source: ${source}`); // Log the source
                console.log(`Response Data: ${JSON.stringify(data.data)}`); // Log the actual data
            }),
        );
    }
}
