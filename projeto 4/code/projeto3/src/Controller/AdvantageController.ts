import { Advantage } from '../entity/Advantage';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { AdvantageService } from '../Services/AdvantageServices';
import { AdvantageRepository } from '../repositories/AdvantageRepository';
import multer from 'multer';

// Definindo a interface para a requisição com arquivo
interface MulterRequest extends Request {
	file?: multer.File;
}

export class AdvantageController {
	private advantageService: AdvantageService;

	constructor() {
		this.advantageService = new AdvantageService();
	}

	async create(request: MulterRequest, response: Response) {
		try {
			const advantageData = request.body;

			// Verifica se existe um arquivo na requisição
			if (request.file) {
				advantageData.image = request.file.buffer;
			}

			const advantage = await this.advantageService.create(advantageData);
			return response.status(201).json(advantage);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}

	async listAllAdvantages(request: Request, response: Response) {
		try {
			const advantages = await this.advantageService.listAllAdvantages();
			return response.json(advantages);
		} catch (error) {
			return response.status(400).json({ error: error.message });
		}
	}

	async listAdvantagesByEnterprise(request: Request, response: Response) {
		try {
			const enterpriseId = parseInt(request.params.enterpriseId);

			if (isNaN(enterpriseId)) {
				return response.status(400).json({ error: 'Invalid enterprise ID' });
			}

			const advantages = await this.advantageService.listAdvantagesByEnterprise(enterpriseId);
			return response.json(advantages);
		} catch (error) {
			return response.status(404).json({ error: error.message });
		}
	}
}
