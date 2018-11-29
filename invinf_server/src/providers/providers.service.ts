import { Injectable } from '@nestjs/common';
import { Provider, ProviderModel } from './model/provider.model';

@Injectable()
export class ProvidersService {
    public async findAll(): Promise<Provider[]> {
        try {
            return await ProviderModel.find();
        } catch (error) {
            return null;
        }
    }
}
