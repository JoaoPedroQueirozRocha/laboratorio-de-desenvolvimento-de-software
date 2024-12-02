import { Repository } from 'typeorm';
import { Account } from '../entity/Account';
import { AppDataSource } from '../data-source';

export class AccountRepository {
    private repository: Repository<Account>;

    constructor() {
        this.repository = AppDataSource.getRepository(Account);
    }

    async create(data: { coins: number }): Promise<Account> {
        const account = this.repository.create({
            coins: data.coins,
        });
        return await this.repository.save(account);
    }

    async findById(id: number): Promise<Account | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['students', 'professors'],
        });
    }

    async findByRelation(relation: string, id: number): Promise<Account | null> {
        return await this.repository.findOne({
            where: { [relation + 's']: { id } },
            relations: [relation + 's', `${relation}s.user`],
        });
    }

    async removeCoins(id: number, coins: number) {
        const account = await this.findById(id);
        if (!account) {
            throw new Error('Account not found');
        }
        account.coins -= coins;
        return await this.repository.save(account);
    }

    async addCoins(id: number, coins: number) {
        try {
            const account = await this.findById(id);
            if (!account) {
                throw new Error('Account not found');
            }
            coins = Number(coins);
            const currentCoins = Number(account.coins);
            const newCoins = currentCoins + coins;
            account.coins = newCoins;
            return await this.repository.save(account);
        } catch (error) {
            throw new Error(error.message || 'Error adding coins to account');
        }
    }
}
